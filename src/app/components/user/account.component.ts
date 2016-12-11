import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {
  src;
  constructor(
    private router: Router,private domSanitizer : DomSanitizer
    ) {}

  ngOnInit() {
      this.src = this.domSanitizer.bypassSecurityTrustResourceUrl('https://blog.mozilla.org/security/files/2015/05/HTTPS-FAQ.pdf');
  }

}
