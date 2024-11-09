import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../model/user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { UserDetails } from "../model/user-details.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";

@Injectable({
    providedIn: 'root'
})
export class FirebaseUserService {
    userDetailList: AngularFireList<UserDetails>;
    users: any[];

    constructor(private db: AngularFireDatabase) {
    }

    getUsers() {
        this.db.list('/users').valueChanges().subscribe(users => {
            this.users = users;
        });
        return this.users;
    }

    createUser(userDetails: UserDetails) {
        // Create a new user
        this.db.list('/users').push(userDetails);
    }

    getUserDetailList() {
        this.userDetailList = this.db.list('userDetails');
    }

    insertUserDetails(userDetails: UserDetails) {
        this.userDetailList.push(userDetails);
    }

    updatePost(key: string, updatedTitle: string, updatedContent: string) {
        // Update a post
        this.db.object(`/users/${key}`).update({ title: updatedTitle, content: updatedContent });
    }

    deletePost(key: string) {
        // Delete a post
        this.db.object(`/users/${key}`).remove();
    }

    isLoggedIn() {
        return sessionStorage.getItem('email') != null;
    }

    //get roles
    getUserRole() {
        return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
    }

    getUserEmail(){
        return sessionStorage.getItem('email') != null ? sessionStorage.getItem('email')?.toString() : '';
    }
}
