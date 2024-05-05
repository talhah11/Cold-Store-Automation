import { Component } from '@angular/core';
import { SimulatorService } from '../../../auth/simulator.service';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})


export class WeatherComponent {
  weeklyData: {maxTemp: number, minTemp: number} []= [];
  currentDate: any;
  currentDay: any;
  currentTemp: any;
  weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  constructor(private simulatorService: SimulatorService) {
    this.currentDate = new Date();
    this.currentDay = new Date().getDay() - 1;
    this.simulatorService.getWeekTemp().subscribe((data) => {
      const days = {};
      data.list.forEach(item => {
        const date = item.dt_txt.slice(0, 10);
        if (!days[date]) {
          days[date] = [];
        }
        days[date].push(item.main.temp);
      });

      // loop through the temperature data for each day and find the maximum and minimum values
      for (const date in days) {
        const maxTemp1 = Math.max(...days[date]);
        const minTemp1 = Math.min(...days[date]);
        const weekDay = {maxTemp: maxTemp1, minTemp: minTemp1};
        this.weeklyData.push(weekDay);
      }
    }, (error) => {
      console.log(error);
    }
    );
    this.simulatorService.getCurrentTemp().subscribe((data) => {
      this.currentTemp = data
    }, (error) => {
      console.log(error);
    });
  }

}
