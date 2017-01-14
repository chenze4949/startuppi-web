import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { EventCategory } from '../model/category';

@Component({
  selector: 'sp-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit {
  events:Event[];
  constructor(
    private router: Router,
    private eventService:EventService
    ) {}

  ngOnInit() {
    this.eventService.getEvents().then(events => {
      this.events = events;
    })
  }

}
