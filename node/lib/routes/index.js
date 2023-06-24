"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const user_route_1 = require("./user.route");
const router = (0, express_1.Router)();
const defaultRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/users',
        route: user_route_1.default,
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
exports.default = router;
//# sourceMappingURL=index.js.map