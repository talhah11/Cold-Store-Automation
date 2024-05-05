import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { SimulatorService } from '../../../auth/simulator.service';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'ngx-co2',
  styleUrls: ['./co2.component.scss'],
  templateUrl: './co2.component.html',
})
export class CO2Component implements OnDestroy {

  private alive = true;
  private subscription = new Subject();

  co2Data = { min: 0, max: 10000 };
  co2: number;
  co2Off = false;
  co2Mode = 'cool';

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
        this.co2 = data[4];
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
