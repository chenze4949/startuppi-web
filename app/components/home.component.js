"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var scheduler_component_1 = require('../common/scheduler.component');
var HomeComponent = (function () {
    function HomeComponent(router, http) {
        this.router = router;
        this.http = http;
    }
    HomeComponent.prototype.getEvents = function () {
        return this.http.get('../app/data/events.json')
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resources = [
            {
                id: '1',
                title: 'Room A'
            },
            {
                id: '2',
                title: 'Room B'
            }
        ];
        this.getEvents().then(function (events) {
            _this.events = events;
            console.log(_this.events);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sp-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            directives: [scheduler_component_1.SchedulerComponent],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map