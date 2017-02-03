import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';
import Globals = require('../globals');
import { Event } from '../model/event';
import { EventCategory } from '../model/category';


@Injectable()

export class EventService {
    private eventsUrl = Globals.host + '/events';  // URL to web api
    private eventCategoriesUrl = Globals.host + '/event_categories';  // URL to web api

    constructor(private http:Http) {
        
    }

    getEvents(): Promise<Event[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.eventsUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToEvents(response.json().response))
                .catch(this.handleError);
    }

    getEventCategories(): Promise<EventCategory[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.eventCategoriesUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToEventCategories(response.json().response))
                .catch(this.handleError);
    }

    mapJSONToEvents(data):Event[]{
        let events = new Array<Event>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        events.push(this.mapJSONToEvent(element));
        }
        return events;
    }

    mapJSONToEvent(data){
        let event:Event = new Event();
        event.id = data.id;
        event.title = data.title;
        event.address = data.address;
        event.enroll = data.enroll;
        event.introduction = data.introduction;
        event.detail = data.detail;
        event.start = new Date(data.start_time);
        event.end = new Date(data.end_time);
        event.currency = data.currency;
        event.icon = data.icon;
        return event;
    }

    mapJSONToEventCategories(data):EventCategory[]{
        let categories = new Array<EventCategory>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        categories.push(this.mapJSONToCategory(element));
        }
        return categories;
    }

    mapJSONToCategory(data):EventCategory{
        let category:EventCategory = new EventCategory();
        category.id = data.id;
        category.name = data.name;
        
        return category;
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}