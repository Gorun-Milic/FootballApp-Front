import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nation } from '../model/Nation';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  private _url  = "http://localhost:8080/nations";

  constructor(private http: HttpClient) { }

  getNations(): Observable<Nation[]> {
    return this.http.get<Nation[]>(this._url);
  }
}
