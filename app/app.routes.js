"use strict";
var router_1 = require('@angular/router');
var auth_guard_service_1 = require('./auth-guard.service');
var auth_service_1 = require('./service/auth.service');
var home_component_1 = require('./components/home.component');
var activity_component_1 = require('./components/activity.component');
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'activity',
        component: activity_component_1.ActivityComponent
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes), [auth_guard_service_1.AuthGuard, auth_service_1.Auth]
];
//# sourceMappingURL=app.routes.js.map