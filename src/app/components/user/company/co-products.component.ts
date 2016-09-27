import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TableOptions,
  TableColumn,
  ColumnMode
} from './release/angular2-data-table';

@Component({
  moduleId: module.id,
  selector: 'co-products',
  templateUrl: 'co-products.component.html',
  styleUrls: ['material.css']
})
export class CoProductsComponent implements OnInit {
    rows = [];
    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 50,
        footerHeight: 50,
        rowHeight: 'auto',
        columns: [
        new TableColumn({ prop: 'name' }),
        new TableColumn({ name: 'Gender' }),
        new TableColumn({ name: 'Company' })
        ]
    });
    constructor(private router: Router) {
        this.fetch((data) => {
        this.rows.push(...data);
        });
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/company.json`);

        req.onload = () => {
        cb(JSON.parse(req.response));
        };

        req.send();
    }

    ngOnInit() {
    }

}
