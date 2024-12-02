import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

/**
 * Directive to dynamically set weather icons based on temperature values.
 * Usage: <img [appWeatherIcon]="temperature" />
 */
@Directive({
  selector: '[appWeatherIcon]',
  standalone: true,
})
export class WeatherIconDirective {
  /** Input to receive the temperature value in Celsius. */
  @Input() appWeatherIcon: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateWeatherIcon();
  }

  ngOnChanges() {
    this.updateWeatherIcon();
  }

  /**
   * Updates the weather icon based on the current temperature value.
   */
  private updateWeatherIcon() {
    const iconPath = this.determineWeatherIcon(this.appWeatherIcon);
    this.renderer.setAttribute(this.el.nativeElement, 'src', iconPath);
  }

  /**
   * Determines the weather icon based on the given temperature.
   * @param temperatureCelsius - Temperature value in Celsius.
   * @returns The file path of the corresponding weather icon.
   */

  private determineWeatherIcon(temperatureCelsius: number | undefined): string {
    if (temperatureCelsius === undefined || temperatureCelsius === null) {
      return 'assets/Icons/01n.png'; // Default icon
    }

    if (temperatureCelsius <= 0) {
      return 'assets/Icons/13n.png'; // Snowy
    } else if (temperatureCelsius > 0 && temperatureCelsius <= 15) {
      return 'assets/Icons/10n.png'; // Cold
    } else if (temperatureCelsius > 15 && temperatureCelsius <= 25) {
      return 'assets/Icons/02d.png'; // Good
    } else {
      return 'assets/Icons/01d.png'; // Hot
    }
  }
}
