import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { TemperatureHumidityData, Temperature } from '../data/temperature-humidity';

@Injectable()
export class TemperatureHumidityService extends TemperatureHumidityData {

  private temperatureDate: Temperature = {
    value: 24,
    min: 32,
    max: 118,
  };

  private humidityDate: Temperature = {
    value: 87,
    min: 0,
    max: 100,
  };

  private co2Date: Temperature = {
    value: 5000,
    min: 0,
    max: 10000,
  };

  getTemperatureData(): Observable<Temperature> {
    return observableOf(this.temperatureDate);
  }

  getHumidityData(): Observable<Temperature> {
    return observableOf(this.humidityDate);
  }

  getco2Data(): Observable<Temperature> {
    return observableOf(this.co2Date);
  }
}
