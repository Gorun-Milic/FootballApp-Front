import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BuyPlayerDto } from '../dto/BuyPlayerDto';
import { Playerclubdto } from '../dto/Playerclubdto';
import { Playerdto } from '../dto/Playerdto';
import { Playernationdto } from '../dto/Playernationdto';
import { Searchplayersdto } from '../dto/Searchplayersdto';
import { Nation } from '../model/Nation';
import { Player } from '../model/Player';
import { Playerclub } from '../model/Playerclub';
import { StatisticData } from '../model/StatisticData';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerid = 0;

  private _url1= "http://localhost:8080/addplayer";
  private _url2 = "http://localhost:8080/playernation";
  private _url3= "http://localhost:8080/player";
  private _url4= "http://localhost:8080/bestGoalscorers";
  private _url5= "http://localhost:8080/players";
  private _url6 = "http://localhost:8080/searchplayers";
  private _url7 = "http://localhost:8080/playerclub"
  private _url8 = "http://localhost:8080/isremembered";
  private _url9 = "http://localhost:8080/deleteplayerclub";
  private _url10 = "http://localhost:8080/remembered";
  private _url11 = "http://localhost:8080/buyPlayer";
  private _url12 = "http://localhost:8080/isPlayingForClub";

  constructor(private http: HttpClient, private router: Router) { }

  addPlayer(uploadData: FormData, playernation: Playernationdto) {
    this.http.post<Player>(this._url1, uploadData).subscribe(data=>{this.playerid = data.playerid;
                                                                    if (playernation.nationid1!=undefined || playernation.nationid2!=undefined) {
                                                                        playernation.playerid = this.playerid;
                                                                        this.addPlayerNation(playernation);
                                                                    }
      this.router.navigate(['/club-profile']);
    });
  }

  addPlayerNation(playernation: Playernationdto) {
    this.http.post<string>(this._url2, playernation).subscribe(data=>console.log(data));
  }

  removePlayer(playerid: number): Observable<string> {
    return this.http.delete<string>(this._url3 + "/" + playerid);
  }

  getBestGoalScorers(clubId: number): Observable<StatisticData> {
    return this.http.get<StatisticData>(this._url4 + "/" + clubId);
  }

  getPlayer(playerid: number): Observable<Player> {
    return this.http.get<Player>(this._url3 + "/" + playerid);
  }

  editPlayer(playerModel: Player) {
    this.http.put<Player>(this._url3, playerModel).subscribe(data=>{
      console.log("Player updated!");
    });
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this._url5);
  }

  searchPlayers(searchPlayer: Searchplayersdto): Observable<Player[]> {
    return this.http.post<Player[]>(this._url6, searchPlayer);
  }

  getPlayerNations(playerid: number): Observable<Nation[]> {
    return this.http.get<Nation[]>(this._url2 + '/' + playerid);
  }

  savePlayerclub(playerclub: Playerclubdto): Observable<Playerclub> {
    return this.http.post<Playerclub>(this._url7, playerclub);
  }

  isSaved(playerclub: Playerclubdto): Observable<number> {
    return this.http.post<number>(this._url8, playerclub);
  }

  unSave(playerclubid: number): Observable<string> {
    return this.http.delete<string>(this._url9 + "/" + playerclubid);
  }

  getSavedPlayers(clubid: number): Observable<Playerclub[]> {
    return this.http.get<Playerclub[]>(this._url10 + "/" + clubid);
  }

  buyPlayer(buyPlayer: BuyPlayerDto): Observable<boolean> {
    return this.http.post<boolean>(this._url11, buyPlayer);
  }

  isPlayingForClub(playerclub: Playerclubdto): Observable<boolean> {
    return this.http.post<boolean>(this._url12, playerclub);
  }

}
