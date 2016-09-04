"use strict";
var router_1 = require('@angular/router');
var auth_guard_service_1 = require('./auth-guard.service');
var auth_service_1 = require('./service/auth.service');
var home_component_1 = require('./components/home.component');
var activity_component_1 = require('./components/activity.component');
var product_component_1 = require('./components/product.component');
var login_component_1 = require('./components/user/login.component');
var register_component_1 = require('./components/user/register.component');
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'activity',
        component: activity_component_1.ActivityComponent
    },
    {
        path: 'products',
        component: product_component_1.ProductComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes), [auth_guard_service_1.AuthGuard, auth_service_1.Auth]
];
//# sourceMappingURL=app.routes.js.map