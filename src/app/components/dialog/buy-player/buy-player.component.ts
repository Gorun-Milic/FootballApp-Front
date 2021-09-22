import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BuyPlayerDto } from 'src/app/dto/BuyPlayerDto';
import { Club } from 'src/app/model/Club';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-buy-player',
  templateUrl: './buy-player.component.html',
  styleUrls: ['./buy-player.component.css']
})
export class BuyPlayerComponent implements OnInit {

  club: Club;
  playerModel: Player;

  constructor(public dialogRef: MatDialogRef<BuyPlayerComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {playerid: number},
              private playerService: PlayerService,
              private authService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.playerService.getPlayer(this.data.playerid).subscribe(
      (res)=>{
        console.log(res.name);
        this.playerModel = res;
      }
    );
    this.club = this.authService.getClub();
  }

  buyPlayer() {
    console.log("Igrac: " + this.playerModel);
    if (this.club.value >= this.playerModel.value) {
      let bp: BuyPlayerDto = new BuyPlayerDto(this.club.clubid, this.data.playerid);
      this.playerService.buyPlayer(bp).subscribe(
        (res)=>{
          if (res) {
            this.notificationService.showSuccess("Success", "Succesfully bought player!");
            this.dialogRef.close("yes");
          }
        },
        (error)=>{
          this.notificationService.showError("Error", "You dont have enough money!");
            this.dialogRef.close("no");
        }
      )
    }else {
      this.notificationService.showError("Error", "You dont have enough money!");
      this.dialogRef.close("no");
    }
  }

}
