import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Club } from 'src/app/model/Club';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { PlayerService } from 'src/app/services/player.service';
import { DeletePlayerComponent } from '../dialog/delete-player/delete-player.component';
import { EditPlayerComponent } from '../dialog/edit-player/edit-player.component';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.css']
})
export class ClubProfileComponent implements OnInit {

  public club = new Club(undefined, undefined, undefined, undefined, undefined, undefined, undefined);

  players = [];
  displayedColumns: string[] = ['playerid', 'name', 'surname', 'position', 'goals', 'assists', 'foot', 'dateofbirth', 'actions'];

  //photo data
  public selectedFile;
  convertedImage = undefined;
  buttonDisabled = true;

  constructor(private authService: AuthService, private clubService: ClubService, private playerService: PlayerService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.club = this.authService.getClub();
    this.initPlayers();

    if (this.club.img != undefined) {
      this.convertedImage = 'data:image/jpeg;base64,' + this.club.img;
    }
  }

  initPlayers() {
    this.clubService.getPlayers(this.club.clubid).subscribe(data => {
      this.players = data;
    });
  }

  //adding photo mehods
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.buttonDisabled = false;
  }

  // This part is for uploading
  uploadPhoto() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.club.clubid + "");

    this.clubService.uploadPhoto(uploadData).subscribe(
      data => {
        this.authService.setClub(data);
        this.refreshComponent();
      },
      err => {
        console.log('Error Occured duringng saving: ' + err);
        this.refreshComponent();
      }
    );
    this.buttonDisabled = true;
  }

  refreshComponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/club-profile']);
    });
  }

  openDeleteDialog(playerid: number) {
    let dialogRef = this.dialog.open(DeletePlayerComponent);

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res === "yes") {
          this.removePlayer(playerid);
        }
      }
    )
  }

  openEditDialog(playerid: number) {
    let dialogRef = this.dialog.open(EditPlayerComponent, {
      data: { playerid: playerid },
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res==="yes") {
          this.refreshComponent();
        }
      })
  }

  removePlayer(playerid: number) {
    this.playerService.removePlayer(playerid).subscribe(data => {
      this.refreshComponent();
    },
      error => {
        this.refreshComponent()
      });

  }


}
