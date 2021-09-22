import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Searchclubdto } from 'src/app/dto/Searchclubdto';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-search-club',
  templateUrl: './search-club.component.html',
  styleUrls: ['./search-club.component.css']
})
export class SearchClubComponent implements OnInit {

  clubs = [];
  leagues = [];

  searchClub: Searchclubdto = new Searchclubdto(undefined, undefined, undefined);

  constructor(private clubService: ClubService, 
              private leagueService: LeagueService, 
              private router: Router, 
              private authService: AuthService) { }

  ngOnInit() {
    this.clubService.getClubs().subscribe(data => { this.clubs = data });
    this.leagueService.getLeagues().subscribe(data => this.leagues = data);
  }

  searchClubs() {
    this.clubService.searchClubs(this.searchClub).subscribe(data => {
      this.clubs = data
    });
  }

  showClub(clubid: number) {
    if (this.authService.getClub().clubid===clubid) {
      this.router.navigate(['/club-profile']);
    }else {
      this.router.navigate(['/displayclub', clubid]);
    }
  }

}
