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
var router_1 = require('@angular/router');
var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
        this.dialogVisible = false;
    }
    HomeComponent.prototype.getEvents = function () {
    };
    HomeComponent.prototype.handleEventClick = function (e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }
        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.events = [
            {
                "title": "All Day Event",
                "start": "2016-09-01"
            },
            {
                "title": "Long Event",
                "start": "2016-09-07",
                "end": "2016-09-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-09-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-09-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-09-11",
                "end": "2016-09-13"
            }
        ];
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sp-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
var MyEvent = (function () {
    function MyEvent() {
        this.allDay = true;
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;
//# sourceMappingURL=home.component.js.map