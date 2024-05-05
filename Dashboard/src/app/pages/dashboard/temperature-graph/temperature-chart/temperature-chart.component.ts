import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils';
import { SimulatorService } from '../../../../auth/simulator.service';

interface DataItem {
  name: string;
  value: [string, number];
}

@Component({
  selector: 'ngx-temperature-chart',
  styleUrls: ['./temperature-chart.component.scss'],
  template: `
    <div echarts
         [options]="option"
         [merge]="option"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})

export class TemperatureChartComponent implements AfterViewInit, OnDestroy {

  @Input() data: any;
  private alive = true;
  private data1: DataItem[] = [];

  option: any;
  echartsIntance: any;
  temperatureData: any;

  constructor(private theme: NbThemeService,
    private layoutService: LayoutService,
    private simulatoreService: SimulatorService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
    this.temperatureData = {
      Time: '0:00',
      Temperature: 25.4,
      // add more data here if needed
    };
  }

  ngAfterViewInit(): void {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const eTheme: any = config.variables.electricity;
        this.option = this.getOption();

        setInterval(() => {
          this.temperatureData.Temperature = Math.floor(Math.random() * (120 - 32 + 1)) + 32;

          // Increment hours
          const timeArr = this.temperatureData.Time.split(':');
          const hours = parseInt(timeArr[0], 10);
          const minutes = parseInt(timeArr[1], 10);
          let newHours = hours + 1;
          if (newHours == 24) {
            newHours = 0
          }
          const newTime = `${newHours}:${minutes.toString().padStart(2, '0')}`;
          this.temperatureData.Time = newTime;

          this.data1.push({
            name: this.temperatureData.Time,
            value: [
              this.temperatureData.Time,
              Math.round(this.temperatureData.Temperature),
            ],
          });

          if (this.data1.length > 12) {
            this.data1.shift();
          }

          this.option.xAxis.data = this.data1.map(item => item.name);
          this.option.series[0].data = this.data1.map(item => item.value);

          this.echartsIntance.setOption(this.option);
        }, 5000);

      });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getOption() {
    return {
      backgroundColor: '#f7f7f7',
      title: {
        text: 'Temperature (°F)',
        textStyle: {
          color: '#222B45',
        },
        left: "center",
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const time = params[0].name;
          return (
            time +
            ' : ' +
            params[0].value[1] +
            ' °F'
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisTick: {
          interval: 5, // show a tick every 5 categories (i.e. every 5 hours)
        },
        data: [], // initialize with empty array
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          smooth: true,
          data: [], // initialize with empty array
          itemStyle: {
            normal: {
              color: (params: any) => {
                const temperature = params.value[1];
                if (temperature >= 45) {
                  return 'red'; // caution
                } else if (temperature >= 40) {
                  return 'orange'; // in between good and bad
                } else if (temperature >= 34) {
                  return 'green'; // success
                } else {
                  return 'blue'; // default color
                }
              },
              lineStyle: {
                color: 'black',
                width: 2,
              },
            },
          },
        },
      ],
    };
  }

}