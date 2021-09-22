import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playerclubdto } from 'src/app/dto/Playerclubdto';
import { Searchplayersdto } from 'src/app/dto/Searchplayersdto';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit {

  public searchPlayer = new Searchplayersdto(undefined, undefined, undefined, undefined, undefined);

  public players = [];
  public positions = ["GK", "RB", "CB", "LB", "DMF", "CMF", "RW", "AMF", "LW", "CF"]

  constructor(private playerService: PlayerService, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(data=>this.players = data);
  }

  searchPlayers() {
    this.playerService.searchPlayers(this.searchPlayer).subscribe(data=>{
      this.players = data
    });
  }

  // savePlayer(player) {
  //   let playerclub = new Playerclubdto(undefined, player.playerid, this.authService.getClub().clubid);
  //   this.playerService.savePlayerclub(playerclub).subscribe(data => {
  //     this.refreshComponent()
  //   });
  // }

  showPlayer(playerid: number) {
    this.router.navigate(['/displayplayer', playerid]);
  }

  refreshComponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/search-player']);
    });
  }

}
