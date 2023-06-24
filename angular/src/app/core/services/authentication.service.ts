import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/app.constants';
import { LoginParams, LoginResponse } from '@models/auth.model';
import { HttpClientService } from '@services/http-client.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  login(params: any): Observable<LoginResponse> {
    return this.httpClientService.post(API_ROUTES.loginApi, params);
  }

  forgotPassword(params: Partial<LoginParams>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.forgotPasswordApi, params);
  }

  setPassword(params: Partial<LoginParams>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.setPasswordApi, params);
  }
}
