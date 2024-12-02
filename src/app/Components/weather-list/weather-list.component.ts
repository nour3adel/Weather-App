import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { City } from '../../Models/city';
import { WeatherService } from '../../Services/weather.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.scss',
})
export class WeatherListComponent implements OnInit {
  title: string = 'Weather Application';
  cityID: string = '';
  cityName: string = '';
  selectedDate: string = '';
  cities: City[] = [];
  filteredCities: City[] = [];
  ResultCity: City | null = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchAllWeather();
  }

  /** Fetch all cities weather data */
  fetchAllWeather(): void {
    this.weatherService.getCitiesWeather().subscribe(
      (data) => {
        console.log('Received cities data:', data);
        this.cities = data;
        this.filteredCities = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load weather data.';
        console.error(error);
      }
    );
  }

  // Search for city by ID
  searchByID(): void {
    this.resetErrorMessage();

    const trimmedID = this.cityID.trim();
    if (!trimmedID || isNaN(Number(trimmedID))) {
      this.setErrorMessage('Please enter a valid numeric City ID!');
      return;
    }

    const cityID = Number(trimmedID);
    const matchedCity = this.cities.find((city) => city.id === cityID);

    if (matchedCity) {
      this.filteredCities = [matchedCity];
      this.ResultCity = matchedCity;
    } else {
      this.filteredCities = [];
      this.setErrorMessage(`No city was found with the ID = ${cityID}!`);
    }

    this.cityName = '';
  }

  // Search for city by Name
  searchByName() {
    this.resetErrorMessage();
    const searchName = this.cityName?.trim().toLowerCase();

    if (!searchName) {
      this.setErrorMessage('Please enter a valid city name!');
      return;
    }

    const searchWords = searchName.split(' ');
    const filtered = this.cities.filter((city) => {
      const cityName = city.city.toLowerCase();
      let index = 0;

      return searchWords.every((word) => {
        index = cityName.indexOf(word, index);
        if (index === -1 || (index > 0 && cityName[index - 1] !== ' ')) {
          return false;
        }
        index += word.length;

        return true;
      });
    });

    if (filtered.length > 0) {
      this.filteredCities = filtered;
      this.ResultCity = filtered[0];
      this.errorMessage = '';
    } else {
      this.filteredCities = [];
      this.setErrorMessage(`No cities found with the name ${this.cityName}!`);
    }

    this.cityID = '';
  }

  // Reset the error message
  private resetErrorMessage(): void {
    this.errorMessage = '';
    this.ResultCity = null;
  }

  // Set a custom error message
  private setErrorMessage(message: string): void {
    this.errorMessage = message;
    this.filteredCities = [];
  }

  // Reset All Filters and returns full list of cities
  resetFilters(): void {
    this.filteredCities = [...this.cities];
    this.cityID = '';
    this.cityName = '';
    this.selectedDate = '';
    this.resetErrorMessage();
  }
}
