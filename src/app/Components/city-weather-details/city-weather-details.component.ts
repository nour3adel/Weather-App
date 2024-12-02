import { WeatherService } from './../../Services/weather.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { City } from '../../Models/city';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherIconDirective } from '../../Directives/weather-icon.directive';
import { TemperatureConversionPipe } from '../../Pipes/temperature-conversion.pipe';
import { Forecast } from '../../Models/forecast';
import { BackGroundImageDirective } from '../../Directives/back-ground-image.directive';

@Component({
  selector: 'app-city-weather-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    WeatherIconDirective,
    TemperatureConversionPipe,
    BackGroundImageDirective,
  ],
  templateUrl: './city-weather-details.component.html',
  styleUrls: ['./city-weather-details.component.scss'],
})
export class CityWeatherDetailsComponent implements OnInit {
  title: string = 'Weather Details';
  cityWeather: City | undefined;
  selectedDate: string = '';
  temperatureUnit: 'C' | 'F' = 'C';
  filteredForecast: any[] = [];
  errorMessage: string = '';
  latestForecast: Forecast | null = null;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.fetchCityWeather();
  }

  // Get city weather details
  fetchCityWeather() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid City ID!';
      return;
    }
    this.weatherService.getCityWeatherById(id).subscribe(
      (data) => {
        if (data) {
          this.cityWeather = data;
          this.filteredForecast = data.forecast || [];
          this.computeLatestForecast();
        } else {
          this.errorMessage = 'City weather data not available.';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching city weather data';
        console.error(error);
      }
    );
  }

  // Compute the latest forecast
  computeLatestForecast() {
    if (this.cityWeather?.forecast?.length) {
      const latest = this.cityWeather.forecast.reduce(
        (latestForecast, currentForecast) =>
          new Date(currentForecast.date) > new Date(latestForecast.date)
            ? currentForecast
            : latestForecast
      );

      this.latestForecast = {
        ...latest,
        temperatureCelsius: latest.temperatureCelsius,
        temperatureFahrenheit: latest.temperatureFahrenheit,
      };
    } else {
      this.latestForecast = null;
    }
  }

  // Toggle temperature unit between Celsius and Fahrenheit
  toggleUnit() {
    this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';
    this.computeLatestForecast();
  }

  // Filter the forecast by date
  filterByDate() {
    if (!this.selectedDate) {
      this.errorMessage = 'Please enter a date.';
      this.filteredForecast = [];
      return;
    }

    if (this.cityWeather?.forecast) {
      this.filteredForecast = this.cityWeather.forecast.filter(
        (forecast) => forecast.date === this.selectedDate
      );

      if (this.filteredForecast.length === 0) {
        this.errorMessage = 'No data for this date.';
      } else {
        this.errorMessage = '';
      }
    } else {
      this.filteredForecast = [];
      this.errorMessage = 'No forecast data available.';
    }
  }

  trackByDate(index: number, forecast: any): string {
    return forecast.date;
  }

  // Reset filters and return full forecast
  resetFilters(): void {
    this.filteredForecast = this.cityWeather?.forecast || [];
    this.selectedDate = '';
    this.errorMessage = '';
  }
}
