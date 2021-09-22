import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../model/League';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private _url = "http://localhost:8080/leagues"

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this._url);
  }
}
