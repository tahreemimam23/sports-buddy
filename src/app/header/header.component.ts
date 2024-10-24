import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'cx-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck {
  isNavRequired: boolean = false;
  isAdmin:boolean = false;
  constructor(private router: Router, private service:AuthService) { }
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isNavRequired = false
    }else{
      this.isNavRequired = true;
    }

    if(this.service.getUserRole()==='admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }
}
