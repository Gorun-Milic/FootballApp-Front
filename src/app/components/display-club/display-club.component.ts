import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Club } from 'src/app/model/Club';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BuyPlayerComponent } from '../dialog/buy-player/buy-player.component';

@Component({
  selector: 'app-display-club',
  templateUrl: './display-club.component.html',
  styleUrls: ['./display-club.component.css']
})
export class DisplayClubComponent implements OnInit {

  otherClub: Club = new Club(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  players: Player[];
  image;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private clubService: ClubService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {

    //geting params from navigation
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.otherClub.clubid = parseInt(params.get('clubid'))
    });

    this.getClub();
    this.getPlayers();
  }

  getClub() {
    this.clubService.getClub(this.otherClub.clubid).subscribe(data => {
      this.otherClub = data
      if (this.otherClub.img != undefined) {
        this.image = 'data:image/jpeg;base64,' + this.otherClub.img;
      }
    });
  }

  getPlayers() {
    console.log(this.otherClub.clubid);
    this.clubService.getPlayers(this.otherClub.clubid).subscribe(data=>{this.players = data});
  }

  showPlayer(playerid: number) {
    this.router.navigate(['/displayplayer', playerid]);
  }

  openBuyPlayerDialog(playerid: number) {
    let dialogRef = this.dialog.open(BuyPlayerComponent, {
      data: { 
        playerid: playerid,
       },
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res==="yes") {
          // this.notificationService.showSuccess("Success", "Succesfully bought player!");
          this.clubService.getClub(this.authService.getClub().clubid).subscribe(data=>{
            this.authService.setClub(data);
          });
          this.refreshComponent();
        }
        // else if (res==="no") {
        //   this.notificationService.showError("Error", "You dont have enough money!");
        // }
      })
  }

  refreshComponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/displayclub', this.otherClub.clubid]);
    });
  }


}
