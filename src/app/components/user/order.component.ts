import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit {
  tabs = [
    { label: '已下單', content: 'This is the body of the first tab' },
    { label: '已完成', content: 'This is the body of the second tab' },
  ];
  constructor(
    private router: Router
    ) {}

  ngOnInit() {
  }

}
