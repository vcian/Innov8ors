import express, { Router } from 'express';
import { EnvironmentConfig } from '../config/EnvironmentConfig';
import authRoute from './auth.route';
import userRoute from './user.route';
import AdminRouter from './admin.route';
const router = Router();

interface RouterInterface {
  path: string;
  route: Router;
}

const defaultRoutes: RouterInterface[] = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
      path: '/users',
      route: userRoute,
  }
];

// const devRoutes: RouteeInterface[] = [
  // IRoute available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (EnvironmentConfig.getInstance().Environment === 'Dev') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
