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
      week: 1,
      schedule: [
        {
          day: 'Monday',
          schedule: [
            {
              "Time": "10am-12pm",
              "Task": "Learn the basics of Angular and create a basic application",
              "checked": false
            },
            {
              "Time": "3pm-5pm",
              "Task": "Practice creating a complex application in Angular",
              "checked": false
            }
          ]
        },
        {
          day: 'Tuesday',
          schedule: [
            {
              "Time": "10am-12pm",
              "Task": "Review what was learned in the previous day and assess the understanding",
              "checked": false
            }
          ]
        },
        {
          day: 'Wednesday',
          schedule: [
            {
              "Time": "6pm-9pm",
              "Task": "Start creating a basic application in Angular and familiarizing with the framework",
              "checked": false
            }
          ]
        }
      ],
    },
    {
      week: 2,
      schedule: [
        {
          day: 'Monday',
          schedule: [
            {
              "Time": "10am-12pm",
              "Task": "Learn the basics of Angular and create a basic application",
              "checked": false
            },
            {
              "Time": "3pm-5pm",
              "Task": "Practice creating a complex application in Angular",
              "checked": false
            }
          ]
        },
        {
          day: 'Tuesday',
          schedule: [
            {
              "Time": "10am-12pm",
              "Task": "Review what was learned in the previous day and assess the understanding",
              "checked": false
            }
          ]
        },
        {
          day: 'Wednesday',
          schedule: [
            {
              "Time": "6pm-9pm",
              "Task": "Start creating a basic application in Angular and familiarizing with the framework",
              "checked": false
            }
          ]
        }
      ],
    }
  ];
  constructor() { }

  ngOnInit() { }

}
