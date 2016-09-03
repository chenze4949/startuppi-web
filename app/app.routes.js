"use strict";
var router_1 = require('@angular/router');
var auth_guard_service_1 = require('./auth-guard.service');
var auth_service_1 = require('./service/auth.service');
var home_component_1 = require('./components/home.component');
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes), [auth_guard_service_1.AuthGuard, auth_service_1.Auth]
];
//# sourceMappingURL=app.routes.js.map