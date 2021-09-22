import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/model/Club';
import { Playerclub } from 'src/app/model/Playerclub';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  club: Club;
  savedPlayers: Playerclub[] = [];

  constructor(private playerService: PlayerService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.club = this.authService.getClub();
    this.getSavedPlayers();
  }

  getSavedPlayers() {
    this.playerService.getSavedPlayers(this.club.clubid).subscribe(data=>{this.savedPlayers = data});
  }

  showPlayer(playerid: number) {
    this.router.navigate(['/displayplayer', playerid]);
  }

}
