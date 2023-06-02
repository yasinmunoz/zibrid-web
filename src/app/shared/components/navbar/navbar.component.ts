import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  token: string | null = localStorage.getItem('token');    

  constructor(private _router: Router) {
    
  }  
  
  ngOnInit(): void {
    this.showPublicarEspacio();
  }

  showPublicarEspacio () {
    this._router.events.subscribe(e => {      
      if (e instanceof NavigationEnd) {
        if (e.url === '/listing') {          
          return false;
        } else {
          return true;
        }
      }
      return false;
    })
    
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
