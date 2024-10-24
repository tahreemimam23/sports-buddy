import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userData: any;
  loginForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  constructor(private service: AuthService, private router:Router){
    sessionStorage.clear();
  }
  ngOnInit(): void {
    this.loginForm.setControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.loginForm.setControl('password', new FormControl('', [Validators.required]));
  }
  login(){
    this.isSubmitted = true;
    if(this.loginForm.valid){
      this.service.getUserById(this.loginForm.value.email).
      subscribe(res=>{
        this.userData = res;
        if(this.userData.password === this.loginForm.value.password){
          if(this.userData.isActive){
            sessionStorage.setItem('email',this.userData.id);
            sessionStorage.setItem('role',this.userData.role);
            if(this.userData.role == 'admin'){
              this.router.navigate(['admin'])
            }else if(this.userData.role=='user'){
              this.router.navigate(['user'])
            }
          }else{
            alert("Please Contact Admin")
          }
        }else{
          alert("invalid credentials")
        }
      });
    }else{
      alert("Please enter valid data")
    }
  }

  get formControls() {
    return this.loginForm['controls'];
  }
}
