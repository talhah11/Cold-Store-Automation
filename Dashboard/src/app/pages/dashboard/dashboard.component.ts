import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { interval } from 'rxjs';
import { SimulatorService } from '../../auth/simulator.service';
import { NbToastrService } from '@nebular/theme';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  loading: boolean = true;
  dashboardData: any;
  solarValue: number;
  lightCard: CardSettings = {
    title: 'Condenser',
    iconClass: 'nb-loop-circled',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Heat Exchanger',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Humidifier',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Dehumidifier',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;
  modelPrediction: any;
  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  itemStored: any;

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.lightCard,
          type: 'warning',
        },
        {
          ...this.rollerShadesCard,
          type: 'primary',
        },
        {
          ...this.wirelessAudioCard,
          type: 'danger',
        },
        {
          ...this.coffeeMakerCard,
          type: 'info',
        },
      ],
      dark: this.commonStatusCardsSet,
    };

  constructor(private themeService: NbThemeService,
    private solarService: SolarData,
    private simulatorService: SimulatorService,
    private cdr: ChangeDetectorRef,
    private toastrService: NbToastrService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

    // Call the API after 10 seconds
    interval(10000)
      .pipe(
    )
      .subscribe(() => {
        this.simulatorService.randomize();
        this.simulatorService.Data.subscribe((data) => {
          this.dashboardData = data;
          if (this.dashboardData[2] > 45) {
            this.sendNotification(`Temperature of ${this.itemStored} stored in a room is ${this.dashboardData[2]} °F.`);
          }
          this.simulatorService.predict(this.dashboardData).subscribe((data1) => {
            this.modelPrediction = data1[0].toFixed(1);
            this.loading = false;
            if (this.dashboardData[5] == 40 && this.dashboardData[6] == 34) {
              this.itemStored = "Potato Untreated";
            } else if (this.dashboardData[5] == 40 && this.dashboardData[6] == 35) {
              this.itemStored = "Golden Apple";
            } else if (this.dashboardData[5] == 45 && this.dashboardData[6] == 37) {
              this.itemStored = "Orange";
            }
            this.cdr.detectChanges(); // manually trigger change detection
          }, (error1) => {
            console.log(error1);
          });
        }, (error) => {
          console.log(error);
        })
        if (this.dashboardData != null) {
          if (this.dashboardData[2] > 45) {
            // this.simulatorService.sendEmail(this.itemStored, this.dashboardData[2]).subscribe((data)=> {
            //   console.log(data);
            // }, (error)=> {

            // });
          }
        }
      });
  }

  lastNotificationMessage: string = '';
  lastTemp = 0;
  firstTime = true;
  sendNotification(message: string) {
    if(this.firstTime) {
      this.firstTime = false;
      return;
    }
    if (message !== this.lastNotificationMessage && this.lastTemp != this.dashboardData[2]) {
      this.toastrService.warning(message, 'Caution', { duration: 3000 });
      this.lastNotificationMessage = message;
      this.lastTemp = this.dashboardData[2];
      
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
