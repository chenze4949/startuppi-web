import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'co-products',
  templateUrl: 'co-products.component.html',
  styleUrls: ['co-products.component.css']
})
export class CoProductsComponent implements OnInit {
    rows = [];
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

    onRowSelect(event) {
    
}

    ngOnInit() {
    }

}
