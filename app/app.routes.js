"use strict";
var router_1 = require('@angular/router');
var auth_guard_service_1 = require('./auth-guard.service');
var auth_service_1 = require('./service/auth.service');
var routes = [];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes), [auth_guard_service_1.AuthGuard, auth_service_1.Auth]
];
//# sourceMappingURL=app.routes.js.map