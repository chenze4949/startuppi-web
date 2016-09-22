"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home.component');
var activity_component_1 = require('./components/activity.component');
var product_component_1 = require('./components/product.component');
var group_component_1 = require('./components/group.component');
var login_component_1 = require('./components/user/login.component');
var register_component_1 = require('./components/user/register.component');
var appRoutes = [
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
        path: 'group',
        component: group_component_1.GroupComponent
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
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map