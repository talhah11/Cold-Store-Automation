import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { FormsModule } from '@angular/forms';
import { CO2Component } from './co2/co2.component';
import { CO2DraggerComponent } from './co2/co2-dragger/co2-dragger.component';
import { HumidityComponent } from './humidity/humidity.component';
import { HumidityDraggerComponent } from './humidity/humidity-dragger/humidity-dragger.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { TemperatureChartComponent } from './temperature-graph/temperature-chart/temperature-chart.component';
import { HumidityGraphComponent } from './humidity-graph/humidity-graph.component';
import { HumidityChartComponent } from './humidity-graph/humidity-chart/humidity-chart.component';
import { CO2GraphComponent } from './co2-graph/co2-graph.component';
import { CO2ChartComponent } from './co2-graph/co2-chart/co2-chart.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    CO2Component,
    CO2DraggerComponent,
    HumidityComponent,
    HumidityDraggerComponent,
    TemperatureGraphComponent,
    TemperatureChartComponent,
    HumidityGraphComponent,
    HumidityChartComponent,
    CO2GraphComponent,
    CO2ChartComponent
  ],
})
export class DashboardModule { }
