import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Playerdto } from 'src/app/dto/Playerdto';
import { Club } from 'src/app/model/Club';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  playerModel: Player;
  
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {playerid: number}, 
              private playerService: PlayerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.playerService.getPlayer(this.data.playerid).subscribe(
      (res)=>{
        this.playerModel = res;
      }
    );
  }

  editPlayer() {
    this.playerModel.clubid = this.authService.getClub().clubid;
    this.playerService.editPlayer(this.playerModel);
    this.dialogRef.close('yes');
  }

}
