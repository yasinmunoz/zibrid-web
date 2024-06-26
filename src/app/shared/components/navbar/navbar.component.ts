import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  token: string | null = localStorage.getItem('token');

  constructor(private _router: Router) {

  }


  logout() {

    if (window.location.pathname === '/') {
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

  }

}
