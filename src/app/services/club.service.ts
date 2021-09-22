import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../dto/AuthenticationRequest';
import { AuthenticationResponce } from '../dto/AuthenticationResponce';
import { Clubdto } from '../dto/ClubDto';
import { Searchclubdto } from '../dto/Searchclubdto';
import { Club } from '../model/Club';
import { Player } from '../model/Player';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private _urlAuth = "http://localhost:8080/authenticate";
  private _url = "http://localhost:8080/club";
  private _url1  = "http://localhost:8080/login";
  private _url2  = "http://localhost:8080/playersByClub";
  private _url3 = "http://localhost:8080/image";
  private _url4 = "http://localhost:8080/clubs";
  private _url5 = "http://localhost:8080/searchclubs"
  private _url6 = "http://localhost:8080/register"

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  authenticate(authRequest: AuthenticationRequest): Observable<AuthenticationResponce> {
    return this.http.post<AuthenticationResponce>(this._urlAuth, authRequest);
  }

  register(clubModel: Clubdto): Observable<Club> {
    return this.http.post<Club>(this._url6, clubModel);
  }

  login(clubModel: Clubdto): Observable<Club> {
    return this.http.post<Club>(this._url1, clubModel);
  }

  getPlayers(clubId: number) {
    return this.http.get<Player[]>(this._url2 + "/" + clubId);
  }

  uploadPhoto(uploadData): Observable<Club> {
    return this.http.put<Club>(this._url3, uploadData);
  }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this._url4);
  }

  searchClubs(searchClub: Searchclubdto): Observable<Club[]> {
    return this.http.post<Club[]>(this._url5, searchClub);
  }

  getClub(clubid: number): Observable<Club> {
    return this.http.get<Club>(this._url + "/" + clubid);
  }

}
