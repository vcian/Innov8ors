import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CpButtonComponent } from '@app/shared/cp-libs/cp-button/cp-button.component';
import { APP_CONSTANTS } from '@constants/app.constants';
import { ILogin, LoginResponse } from '@models/auth.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { AuthenticationService } from '@services/authentication.service';
import { LocalStorageService } from '@services/local-storage.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CpButtonComponent, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginParam: ILogin = new ILogin();
  isSubmitted = false;
  onOtp = false;
  readonly supportEmail = APP_CONSTANTS.SUPPORT_EMAIL;
  private destroyRef = inject(DestroyRef);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toasterService: AlertToastrService,
    private utilityService: UtilityService
  ) { }

  onSubmit(loginForm: NgForm): boolean | void {
    if (loginForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    const params = this.loginParam;
    if (this.onOtp) {
      this.onSubmitOtp(params);
    }
    else {
      this.onSubmitEmail(params);
    }
  }

  onSubmitEmail(params): void {
    this.authenticationService.login(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: LoginResponse) => {
          if (res) {
            this.isSubmitted = false;
            this.onOtp = true;
            console.log(res);
            // this.localStorageService.set(LOCAL_STORAGE_CONSTANT.LOGIN_TOKEN, res.token);
            // this.localStorageService.set(LOCAL_STORAGE_CONSTANT.USER_ROLE, res.role);
            // this.localStorageService.set(LOCAL_STORAGE_CONSTANT.USER_DATA, res);
            // this.utilityService.changeLanguage(res.locale);
            // this.router.navigate(['/admin']).then(() => {
            //   this.toasterService.displaySnackBarWithTranslation('toasterMessage.loggedInSuccessfully', MessageType.success);
            // });
          }
        },
        error: () => {
          this.isSubmitted = false;
        }
      });
  }

  onSubmitOtp(params): void {
    params.otp = this.loginParam.otp;
  }
}
