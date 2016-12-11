import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'co-profile',
  templateUrl: 'co-profile.component.html',
  styleUrls: ['co-profile.component.css']
})
export class CoProfileComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
