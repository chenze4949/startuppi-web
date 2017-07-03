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
    private hottestEventsUrl = Globals.host + '/events/get_hottest_events';  // URL to web api
    private eventsUrl = Globals.host + '/events';  // URL to web api
    private eventCategoriesUrl = Globals.host + '/event_categories';  // URL to web api

    constructor(private http:Http) {
        
    }



    getHottestEvents(): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get(this.hottestEventsUrl,{headers: headers})
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
    }

    getEvents(category_id:number, current_page:number): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = category_id? (this.eventsUrl + "/get_events_by_category?event_category_id=" + category_id)  : this.eventsUrl
    if (current_page){
        url = url + (category_id? "&page=" : "?page=") + current_page;
    }
    
    return this.http.get(url,{headers: headers})
                .toPromise()
                .then(response => response)
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

    createEvent(title:string,introduction:string,start_time:Date,end_time:Date,address:string,detail:string,event_category_id:number): Promise<Event>{
    let creds = JSON.stringify({title:title,introduction:introduction,start_time:start_time,end_time:end_time,
        address:address,detail:detail,event_category_id:event_category_id, currency:'HKD'});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('uid', localStorage.getItem('sp_uid'));
    headers.append('client', localStorage.getItem('sp_client'));
    headers.append('access-token', localStorage.getItem('sp_access-token'));
    console.log(creds);
    return this.http.post(this.eventsUrl, creds, {headers:headers})
               .toPromise()
               .then(response => this.mapJSONToEvent(response.json().response))
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
        event.date_long_str = this.convertLongZHDate(event.start) +  " 至 " + 
            this.convertLongZHDate(event.end);
        event.date_short_str = this.convertShortZHDate(event.start) +  " 至 " + 
            this.convertShortZHDate(event.end);
        event.currency = data.currency;
        event.cost = data.cost;
        event.cost_str = parseInt(data.cost) == 0 ? "免费" : (this.convertZHCurrency(data.currency) + " " + data.cost);
        event.icon = data.icon;
        event.contact = data.contact;
        event.is_end = data.is_end;
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

    convertShortZHDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var hh  = date.getHours().toString();
        var mm  = date.getMinutes().toString();
        var ss  = date.getSeconds().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
        var utc_date = new Date(Date.UTC(yyyy, mm, dd, hh, mm, ss))
        var string = utc_date.toLocaleDateString("zh-Hans-CN",options)
        return string;
        // return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    convertLongZHDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var hh  = date.getHours().toString();
        var mm  = date.getMinutes().toString();
        var ss  = date.getSeconds().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        var utc_date = new Date(Date.UTC(yyyy, mm, dd, hh, mm, ss))
        var string = utc_date.toLocaleDateString("zh-Hans-CN",options)
        return string;
        // return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }
    convertZHDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }
    convertZHCurrency(currency) {
        var currency_str = "";
        switch (currency) {
            case 'HKD':
                return "港币"
        
            default:
                return currency
        }
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}