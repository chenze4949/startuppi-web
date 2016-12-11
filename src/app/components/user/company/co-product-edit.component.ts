import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'co-product-edit',
  templateUrl: 'co-product-edit.component.html',
  styleUrls: ['co-product-edit.component.css']
})
export class CoProductEditComponent implements OnInit {

  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
