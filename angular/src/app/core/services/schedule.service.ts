import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/app.constants';
import { HttpClientService } from '@services/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  getScheduleList(params: any): Observable<any> {
    return this.httpClientService.get(API_ROUTES.scheduleApi + '/list', { params });
  }

  createSchedule(params: unknown): Observable<any> {
    return this.httpClientService.post(API_ROUTES.scheduleApi + '/create', params);
  }

}
