import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherDetailsComponent } from './city-weather-details.component';

describe('CityWeatherDetailsComponent', () => {
  let component: CityWeatherDetailsComponent;
  let fixture: ComponentFixture<CityWeatherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityWeatherDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityWeatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
