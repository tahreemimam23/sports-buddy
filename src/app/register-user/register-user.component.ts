import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cx-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  genders = ['male', 'female'];
  userRegistrationForm: FormGroup = new FormGroup({});
  constructor(
    private service:AuthService, 
    private router:Router){}
  ngOnInit(): void {
    this.userRegistrationForm.setControl('id', new FormControl('', [Validators.required, Validators.email]));
    this.userRegistrationForm.setControl('name', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('password', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('mobile', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('address1', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('address2', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('pincode', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('city', new FormControl('', [Validators.required]));
    this.userRegistrationForm.setControl('gender', new FormControl('female', [Validators.required]));
    this.userRegistrationForm.setControl('role', new FormControl(''));
    this.userRegistrationForm.setControl('isActive', new FormControl(false));
  }
  registerUser() {
    if(this.userRegistrationForm.valid){
      this.service.registerUser(this.userRegistrationForm)
      .subscribe(result => {
        alert("data registered successfully");
        this.router.navigate(['login'])
      });
    }else{
      alert("please enter valid data")
    }
  }
}
