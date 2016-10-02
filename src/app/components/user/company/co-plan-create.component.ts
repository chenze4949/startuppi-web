import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'co-plan-create',
  templateUrl: 'co-plan-create.component.html',
  styleUrls: ['co-plan-create.component.css']
})
export class CoPlanCreateComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
