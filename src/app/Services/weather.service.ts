import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../Models/city';
import { environment } from '../environment/environment';
environment;
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  //Get All City Weathers
  getCitiesWeather(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/forecast`);
  }

  getCityWeatherById(cityId: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/cityForecast/${cityId}`);
  }
}
