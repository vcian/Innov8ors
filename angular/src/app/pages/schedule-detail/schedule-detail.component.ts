import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

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
  schedule = [
    {
      "week": 1,
      "day": "Wednesday",
      "topic": "Introduction to Angular",
      "hours": 3
    },
    {
      "week": 1,
      "day": "Thursday",
      "topic": "Components in Angular",
      "hours": 3
    },
    {
      "week": 1,
      "day": "Friday",
      "topic": "Introduction to Controllers",
      "hours": 3
    },
    {
      "week": 1,
      "day": "Saturday",
      "topic": "Routing in Angular",
      "hours": 3
    },
    {
      "week": 1,
      "day": "Sunday",
      "topic": "Angular CLI",
      "hours": 3
    },
    {
      "week": 2,
      "day": "Wednesday",
      "topic": "Advanced Components",
      "hours": 3
    },
    {
      "week": 2,
      "day": "Thursday",
      "topic": "Advanced Controllers",
      "hours": 3
    },
    {
      "week": 2,
      "day": "Friday",
      "topic": "Filters",
      "hours": 3
    },
    {
      "week": 2,
      "day": "Saturday",
      "topic": "Directives",
      "hours": 3
    },
    {
      "week": 2,
      "day": "Sunday",
      "topic": "Testing and Debugging",
      "hours": 3
    },
    {
      "week": 3,
      "day": "Wednesday",
      "topic": "Animations",
      "hours": 3
    },
    {
      "week": 3,
      "day": "Thursday",
      "topic": "Actions and Event Handlers",
      "hours": 3
    },
    {
      "week": 3,
      "day": "Friday",
      "topic": "Build System",
      "hours": 3
    },
    {
      "week": 3,
      "day": "Saturday",
      "topic": "Service and Resources",
      "hours": 3
    },
    {
      "week": 3,
      "day": "Sunday",
      "topic": "Deployment",
      "hours": 3
    }
  ];
  scheduleList = [];
  constructor() { }

  ngOnInit() {
    this.arrangeSchedule();
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
