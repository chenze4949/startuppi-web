import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-privacy',
  templateUrl: 'privacy.component.html',
  styleUrls: ['privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
