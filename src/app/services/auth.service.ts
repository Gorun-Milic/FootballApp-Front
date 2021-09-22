import { Injectable } from '@angular/core';
import { Club } from '../model/Club';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public club: Club;

  constructor() { }

  setClub(club: Club) {
    this.club = club;
  }

  getClub() {
    return this.club;
  }

  // refreshClub() {
  //   this.clubService.getClub(this.club.clubid).subscribe((data)=>{this.club=data});
  // }

}
