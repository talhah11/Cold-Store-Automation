import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { SimulatorService } from '../../../auth/simulator.service';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'ngx-humidity',
  styleUrls: ['./humidity.component.scss'],
  templateUrl: './humidity.component.html',
})
export class HumidityComponent implements OnDestroy {

  private alive = true;
  private subscription = new Subject();

  humidityData = { min: 0, max: 100 };
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';

  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
    private simulatorService: SimulatorService,
    private cdr: ChangeDetectorRef) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        this.theme = config.variables.temperature;
      });

    interval(10000).pipe(takeUntil(this.subscription)).subscribe(() => {
      this.simulatorService.Data.subscribe((data) => {
        this.humidity = data[3];
        this.cdr.detectChanges();
      }, (error) => {
        console.log(error);
      })
    })

  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
    this.alive = false;
  }

}
