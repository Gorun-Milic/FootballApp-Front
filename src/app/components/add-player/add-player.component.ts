import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Playerdto } from 'src/app/dto/Playerdto';
import { Playernationdto } from 'src/app/dto/Playernationdto';
import { Club } from 'src/app/model/Club';
import { Nation } from 'src/app/model/Nation';
import { AuthService } from 'src/app/services/auth.service';
import { NationService } from 'src/app/services/nation.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  public club: Club;

  public playerModel = new Playerdto(undefined, undefined, undefined, '', '', '', '', '', undefined, undefined, '', undefined);
  public playernation = new Playernationdto(undefined, undefined, undefined);
  public dateOfBirth: Date;

  public positions = ["GK", "RB", "CB", "LB", "DMF", "CMF", "RW", "AMF", "LW", "CF"]
  public nations: Nation[];

  //photo data
  public selectedFile;

  constructor(private authService: AuthService, 
              private nationService: NationService, 
              private playerService: PlayerService,
              public datepipe: DatePipe) { }

  ngOnInit() {
    this.club = this.authService.getClub();
    this.playerModel.clubid = this.club.clubid;
    this.getNations();
  }

  getNations() {
    this.nationService.getNations().subscribe(data => this.nations = data);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  addPlayer(playerForm) {
    this.playerModel.dateofbirth = this.datepipe.transform(this.dateOfBirth, 'MM/dd/yyyy');
    if (playerForm.valid) {
      const uploadData = new FormData();
      if (this.selectedFile == undefined) {
        this.selectedFile = new Blob();
      }
      uploadData.append('myFile', this.selectedFile, "name");
      uploadData.append('player', JSON.stringify(this.playerModel));

      this.playerService.addPlayer(uploadData, this.playernation);
    }
  }

}
