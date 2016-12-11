import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'co-plan-edit',
  templateUrl: 'co-plan-edit.component.html',
  styleUrls: ['co-plan-edit.component.css']
})
export class CoPlanEditComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
