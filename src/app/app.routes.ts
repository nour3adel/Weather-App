import { Routes } from '@angular/router';

import { NotFoundComponent } from './Components/not-found/not-found.component';
import { WeatherListComponent } from './Components/weather-list/weather-list.component';
import { CityWeatherDetailsComponent } from './Components/city-weather-details/city-weather-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/weather-list', pathMatch: 'full' },
  {
    path: 'weather-list',
    component: WeatherListComponent,
    title: 'city-list',
  },
  {
    path: 'city/:id',
    component: CityWeatherDetailsComponent,
    title: 'City Details',
  },

  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];
