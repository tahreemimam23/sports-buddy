import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserData } from '../model/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails: UserData;
  baseApi = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  setUserDetails(userData) {
    this.userDetails = new UserData(userData.name, userData.id, userData.city)
    return this.userDetails
  }

  //return all data via get method
  getUsers() {
    return this.http.get(this.baseApi)
  }

  getUserById(id: any) {
    return this.http.get(this.baseApi + '/' + id);
  }

  registerUser(userData: FormGroup) {
    return this.http.post(this.baseApi, userData.value);
  }

  updateUser(id: any, updatedUserData: any) {
    return this.http.put(this.baseApi + '/' + id, updatedUserData)
  }

  //get user email
  isLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }

  //get roles
  getUserRole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  }

  //get all roles
  getAllRole() {
    return this.http.get(" http://localhost:3000/role")
  }
}
