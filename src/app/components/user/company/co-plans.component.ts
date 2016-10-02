import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'co-plans',
  templateUrl: 'co-plans.component.html',
  styleUrls: ['co-plans.component.css']
})
export class CoPlansComponent implements OnInit {
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
