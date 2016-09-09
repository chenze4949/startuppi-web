import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sp-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
