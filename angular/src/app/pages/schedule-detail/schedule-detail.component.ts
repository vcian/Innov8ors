import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '@app/core/services/schedule.service';

const imports = [
  CommonModule, MatExpansionModule,
  MatCheckboxModule
];

@Component({
  selector: 'app-schedule-detail',
  standalone: true,
  imports: [...imports],
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss'],
})
export class ScheduleDetailComponent implements OnInit {
  currentWeek = 0;
  schedule = [];

  scheduleList = [];
  constructor(private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const scheduleId = this.activatedRoute.snapshot.params.id;
    this.getScheduleDetails(scheduleId);
    // this.arrangeSchedule();
  }
  getScheduleDetails(scheduleId: string): void {
    this.scheduleService.getScheduleDetails(scheduleId)
      .subscribe((res) => {
        this.schedule = res.schedule;
        this.arrangeSchedule();
      });
  }

  arrangeSchedule(): void {
    this.scheduleList = []
    const totalWeek = this.schedule[this.schedule.length - 1].week;
    for (let i = 1; i <= totalWeek; i++) {
      const currentWeek = this.schedule.filter(s => s.week === i);
      const params = {
        week: currentWeek[0].week,
        schedule: currentWeek.map(s => {
          return {
            "day": s.day,
            "topic": s.topic,
            "hours": s.hours,
            "isCompleted": false
          }
        })
      }
      this.scheduleList.push(params);
    }
  }

  onDaySchedule(week: any): void {
    console.log(week);
  }

}
