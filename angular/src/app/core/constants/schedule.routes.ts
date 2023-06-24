import { Routes } from "@angular/router";
import { BreadcrumbResolverFn } from "@services/breadcrumb-resolve.service";

export const scheduleRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('@pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        data: {
          role: 'admin',
          breadcrumb: 'dashboard',
        },
        resolve: {
          breadcrumbs: BreadcrumbResolverFn,
        }
      },
      {
        path: 'schedule',
        data: {
          breadcrumb: 'partnerList',
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            loadComponent: () =>
              import('@app/pages/learning-list/learning-list.component').then((m) => m.LearningListComponent),
            resolve: {
              breadcrumbs: BreadcrumbResolverFn,
            }
          },
          {
            path: 'add',
            loadComponent: () => import('@app/pages/schedule-create/schedule-create.component')
              .then((m) => m.ScheduleCreateComponent),
            data: {
              breadcrumb: 'add'
            },
            resolve: {
              breadcrumbs: BreadcrumbResolverFn,
            }
          },
          {
            path: ':id',
            loadComponent: () => import('@app/pages/schedule-detail/schedule-detail.component')
              .then((m) => m.ScheduleDetailComponent),
            // resolve: {
            //   breadcrumbs: BreadcrumbResolverFn,
            // }
          },
        ]
      }
    ]
  }
]
