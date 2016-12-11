import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'co-product-create',
  templateUrl: 'co-product-create.component.html',
  styleUrls: ['co-product-create.component.css']
})
export class CoProductCreateComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
