import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateScheduleForm } from '@app/core/models/schedule.model';
import { ScheduleService } from '@app/core/services/schedule.service';
import { CpButtonComponent } from '@app/shared/cp-libs/cp-button/cp-button.component';
import { CpTelInputComponent } from '@app/shared/cp-libs/cp-tel-input/cp-tel-input.component';
import {
  COUNTRY_LIST,
  DURATION_TYPE_LIST, DurationTypeEnum, KNOWLEDGE_LEVEL_LIST, KnowledgeLevelEnum,
  LEARNING_PACE_LIST,
  LEARNING_STYLE_LIST,
  MessageType,
  RegexType, TIME_PREFERENCE_LIST
} from '@constants/app.constants';
import { AllowNumberOnlyDirective } from '@directives/allow-number-only.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';

const imports = [
  CommonModule, MatSlideToggleModule, NgSelectModule,
  FormsModule, CpButtonComponent, ReactiveFormsModule,
  TranslateModule, AllowNumberOnlyDirective, CpTelInputComponent
];

@Component({
  selector: 'app-schedule-create',
  standalone: true,
  imports: [...imports],
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.scss']
})
export class ScheduleCreateComponent implements OnInit {

  createScheduleForm: FormGroup<CreateScheduleForm>;
  uuid: string;
  isSubmitted = false;
  isReadOnly = false;

  readonly countryList = COUNTRY_LIST;
  readonly durationTypeList = DURATION_TYPE_LIST;
  readonly timePreferenceList = TIME_PREFERENCE_LIST;
  readonly knowledgeLevelList = KNOWLEDGE_LEVEL_LIST;
  readonly learningStyleList = LEARNING_STYLE_LIST;
  readonly weekDays = LEARNING_STYLE_LIST;
  readonly learningPaceList = LEARNING_PACE_LIST;
  readonly regexType = RegexType;
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toasterService: AlertToastrService,
    private router: Router
  ) {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    if (this.router.url.includes('company-details')) {
      this.isReadOnly = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.createScheduleForm = new FormGroup<CreateScheduleForm>({
      topic: new FormControl('', Validators.required),
      durationType: new FormControl(DurationTypeEnum.weeks, Validators.required),
      duration: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
      timeAvailability: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
      timePreference: new FormControl([], [Validators.required]),
      currentKnowledgeLevel: new FormControl(KnowledgeLevelEnum.beginner, Validators.required),
      desiredKnowledgeLevel: new FormControl(KnowledgeLevelEnum.intermediate, Validators.required),
      learningStyle: new FormControl([], Validators.required),
      weekDays: new FormControl([],Validators.required),
      learningPace: new FormControl(''),
    });

  }

  get formControls(): CreateScheduleForm {
    return this.createScheduleForm.controls;
  }

  onSubmit(): boolean | void {
    this.createScheduleForm.markAllAsTouched();
    if (this.createScheduleForm.invalid) {
      return true;
    }
    this.isSubmitted = true;
    this.createNewSchedule();
  }

  createNewSchedule(): void {
    this.scheduleService.createSchedule(this.createScheduleForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isSubmitted = false;
          this.toasterService.displaySnackBarWithTranslation('toasterMessage.scheduleCreateSuccessful', MessageType.success);
          this.router.navigate(['/schedule/' + response.id], { relativeTo: this.route });

        },
        error: () => {
          this.isSubmitted = false;
        }
      });
  }
  navigateToList() {
    this.router.navigate(['/dashboard'], { relativeTo: this.route });
  }

}
