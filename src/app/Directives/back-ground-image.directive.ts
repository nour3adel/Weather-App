import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appBackGroundImage]',
  standalone: true,
})
export class BackGroundImageDirective implements OnChanges {
  /** Input to receive the temperature value in Celsius. */
  @Input() appBackGroundImage: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appBackGroundImage']) {
      this.updateWeatherBackground();
    }
  }

  /**
   * Updates the background image based on the current temperature value.
   */
  private updateWeatherBackground() {
    const backgroundPath = this.determineWeatherBackground(
      this.appBackGroundImage
    );
    const backgroundStyle = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundPath}) no-repeat center center / cover`;
    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      backgroundStyle
    );
  }
  /**
   * Determines the weather background image based on the given temperature.
   * @param temperatureCelsius - Temperature value in Celsius.
   * @returns The file path of the corresponding background image.
   */
  private determineWeatherBackground(
    temperatureCelsius: number | undefined
  ): string {
    if (temperatureCelsius === undefined || temperatureCelsius === null) {
      return 'assets/images/hot.jpg'; // Default background
    }

    if (temperatureCelsius <= 0) {
      return '/assets/images/snowy.jpg'; // Snowy
    } else if (temperatureCelsius > 0 && temperatureCelsius <= 15) {
      return '/assets/images/cold.jpg'; // Cold
    } else if (temperatureCelsius > 15 && temperatureCelsius <= 25) {
      return '/assets/images/good.jpg'; // Good
    } else {
      return '/assets/images/hot.jpg'; // Hot
    }
  }
}
