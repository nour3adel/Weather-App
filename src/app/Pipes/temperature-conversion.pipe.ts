import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion',
  standalone: true,
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(value: number | null | undefined, unit: 'C' | 'F'): number | null {
    if (value === null || value === undefined || isNaN(value)) {
      return null; 
    }

    switch (unit) {
      case 'F':
        return this.celsiusToFahrenheit(value);
      case 'C':
        return value; 
      default:
        console.warn(`Unsupported temperature unit: ${unit}`);
        return null; 
    }
  }
  private celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }
}
