import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spot } from 'src/app/models/spot';

// Http Headers Options
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

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

  /**
   * POST Method, to add a spot.
   * @param spot Spot data.
   * @returns Observable as Spot created;
   */
  addSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(this.apiURL, spot, httpOptions);
  }

  /**
   * PUT Method, to add a spot comment.
   * @param spot new spot data.
   * @returns Observable as Spot created;
   */
  updateSpot(spot: Spot): Observable<Spot> {
    const url = `${this.apiURL}/${spot.id}`;
    return this.http.put<Spot>(url, spot, httpOptions);
  }
}
