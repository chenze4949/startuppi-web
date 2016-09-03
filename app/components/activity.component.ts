import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sp-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
