import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spot } from 'src/app/models/spot';

@Injectable({
  providedIn: 'root',
})
export class SpotsService {
  /**
   * Json-server URL
   */
  private apiURL = 'http://localhost:3000/spots';

  constructor(private http: HttpClient) {}

  /**
   * GET Method to recover spots list, calling json-server;
   * @returns Observable as Spot list.
   */
  getSpots(): Observable<Spot[]> {
    return this.http.get<Spot[]>(this.apiURL);
  }
}
