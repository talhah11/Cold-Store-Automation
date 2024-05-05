import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  constructor(private http: HttpClient) { }

  public randomize(): any {
    // Call the /random_row endpoint to get the input data
    this.http.get(`http://localhost:5001/random_row`).subscribe((data)=> {
      this.updateData(this.convertTo2DArray(data));
    }, (error)=> {
      console.log(error);
    });
  }

  private dataSource = new BehaviorSubject(null);
  public Data = this.dataSource.asObservable();

  public predict(inputData : any): Observable<any> {
    return this.http.get(`http://localhost:5000/predict?inputData=[[${inputData}]]`);
  }

  public getCurrentTemp(): Observable<any> {
    const apiKey = '1dd962c4542e5b76517edbd61ebab3d8';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=30.3573&lon=73.3827&appid=${apiKey}&units=imperial`

    return this.http.get(url);
  }

  public getWeekTemp(): Observable<any> {
    const apiKey = '1dd962c4542e5b76517edbd61ebab3d8';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=30.3573&lon=73.3827&appid=${apiKey}&units=imperial`

    return this.http.get(url);
  }

  public loadCsvData(): any {
    return this.http.get(`http://localhost:5001/get_data`);
  }

  private convertTo2DArray(dataArray): any {
    let formattedArray = [];

    // Convert each element to the desired data type
    for (let i = 0; i < dataArray.length - 1; i++) {
      let value = dataArray[i];
      switch (i) {
        case 0:
        case 3:
        case 4:
        case 5:
        case 6:
        case 8:
          value = parseInt(value);
          break;
        case 1:
          let hour = parseInt(value.split(':')[0], 10);
          value = hour;
          break;
        case 2:
        case 7:
        case 9:
          value = parseFloat(value);
          break;
        default:
          break;
      }
      formattedArray.push(value);
    }

    return formattedArray;
  }

  public updateData(value: any) {
    this.dataSource.next(value);
  }

  public sendEmail(itemStored, temperatureValue) {
    let subject = `Temperature Alert: ${itemStored} Stored in Room Outside Optimum Range.`
    let html = `<h4>Hello!</h4><p>Your Temperature of Room Storing <b><i>${itemStored}</i>
    </b> is <b>${temperatureValue} °F</b>.
    It is advised to take necessary action.</p>
    <br>
    <b>Regards <br>
    Cold Storage Dashboard</b>.`;
    return this.http.post<any>('http://localhost:1337/api/sensor-readings/send-email', { html, subject })
  }

}