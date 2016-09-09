import { Component, OnInit } from '@angular/core';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { Router } from '@angular/router';
import {SchedulerComponent} from '../common/scheduler.component';

@Component({
  moduleId: module.id,
  selector: 'sp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [SchedulerComponent],
  providers: [HTTP_PROVIDERS]
})
export class HomeComponent implements OnInit {
  events: any [];
  resources: any[];
  constructor(
    private router: Router,
    private http: Http
    ) {}
  
  getEvents() {
      return this.http.get('../app/data/events.json')
                  .toPromise()
                  .then(res => { return res.json(); });
  }

  ngOnInit() {
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

    this.getEvents().then(events => {
        this.events = events;
        console.log(this.events);
    }
    );
  }

}
