import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  token: string | null = localStorage.getItem('token');  

  constructor(private _router: Router){

  }
  
  logout(){
    localStorage.removeItem('token');    
    this._router.navigate(['']);
  }

}
