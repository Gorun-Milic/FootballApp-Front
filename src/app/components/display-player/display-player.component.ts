import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Playerclubdto } from 'src/app/dto/Playerclubdto';
import { Club } from 'src/app/model/Club';
import { Player } from 'src/app/model/Player';
import { Playerclub } from 'src/app/model/Playerclub';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PlayerService } from 'src/app/services/player.service';
import { BuyPlayerComponent } from '../dialog/buy-player/buy-player.component';

@Component({
  selector: 'app-display-player',
  templateUrl: './display-player.component.html',
  styleUrls: ['./display-player.component.css']
})
export class DisplayPlayerComponent implements OnInit {

  userClub: Club = new Club(undefined, undefined, undefined, undefined, undefined, undefined, undefined);

  player: Player = new Player(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,);
  public nations = [];

  public playerclub = new Playerclub(undefined, undefined, undefined);
  saved: boolean = false;
  isPlayerFromOurClub = false;

  constructor(private route: ActivatedRoute,
    private playerService: PlayerService,
    private authService: AuthService,
    private clubService: ClubService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.userClub = this.authService.getClub();

    //geting params from navigation
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.player.playerid = parseInt(params.get('playerid'))
    });

    //getting player      
    this.playerService.getPlayer(this.player.playerid).subscribe(data => { this.player = data });

    this.getPlayerNations(this.player.playerid);

    this.isSaved();

    this.isPlayingForClub();
  }

  getPlayerNations(playerid: number) {
    this.playerService.getPlayerNations(playerid).subscribe(data => {
      console.log(data);
      this.nations = data
    });
  }

  isSaved() {
    console.log("Igrac: " + JSON.stringify(this.player));

    let pc = new Playerclubdto(undefined, this.player.playerid, this.userClub.clubid);
    this.playerService.isSaved(pc).subscribe(data => {
      this.playerclub.playerclubid = data;
      data == 0 ? this.saved = false : this.saved = true
    });
  }

  savePlayer() {
    let playerclub = new Playerclubdto(undefined, this.player.playerid, this.userClub.clubid);
    this.playerService.savePlayerclub(playerclub).subscribe(data => {
      this.playerclub = data
      this.refreshComponent()
    });
  }

  unSave() {
    this.playerService.unSave(this.playerclub.playerclubid).subscribe(data => {
      this.refreshComponent()
    },
      error => {
        this.refreshComponent()
      });
  }

  openBuyPlayerDialog() {
    let dialogRef = this.dialog.open(BuyPlayerComponent, {
      data: { 
        playerid: this.player.playerid,
       },
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res==="yes") {
          this.clubService.getClub(this.userClub.clubid).subscribe(data=>{
            this.authService.setClub(data);
          });
          this.refreshComponent();
        }
      })
  }

  refreshComponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/displayplayer', this.player.playerid]);
    });
  }

  isPlayingForClub() {
    this.playerService.isPlayingForClub(new Playerclubdto(undefined, this.player.playerid, this.userClub.clubid)).subscribe(
      (res)=>{
        this.isPlayerFromOurClub = res;
      }
    );
  }

}
