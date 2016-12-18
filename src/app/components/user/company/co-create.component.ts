import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'co-create',
  templateUrl: 'co-create.component.html',
  styleUrls: ['co-create.component.css']
})
export class CoCreateComponent implements OnInit {
  step1 = true;
  step2 = false;
  

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
