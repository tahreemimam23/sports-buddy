import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../model/user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { UserDetails } from "../model/user-details.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { FirebaseUserService } from "./firebase-user.service";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; //optional required in login
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient, private firebaseUserService: FirebaseUserService) { }

    signUp(userRegistrationData: FormGroup) {
        const email = userRegistrationData.value.id;
        const password = userRegistrationData.value.password
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3OhmNQ9CTwzORA2EYWrmk5WiVOknYto0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.storeUser(userRegistrationData, responseData);
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            })
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3OhmNQ9CTwzORA2EYWrmk5WiVOknYto0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            })
        )
    }

    storeUser(userRegistrationData: FormGroup<any>, responseData: AuthResponseData) {
        const userDetails = new UserDetails(
            responseData.localId,
            userRegistrationData.value.id,
            userRegistrationData.value.name,
            userRegistrationData.value.mobile,
            userRegistrationData.value.address1,
            userRegistrationData.value.address2,
            userRegistrationData.value.pincode,
            userRegistrationData.value.city,
            userRegistrationData.value.gender,
            userRegistrationData.value.role,
            userRegistrationData.value.isActive,
        );
        console.log(userDetails)
        userDetails.role =  userRegistrationData.value.role
        userDetails.isActive = userRegistrationData.value.isActive
        this.firebaseUserService.insertUserDetails(userDetails)
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user)
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = ' An unknown error occured';
        if (!errorResponse.error || !errorResponse.error.error) {
            console.log('error')
            return throwError(errorMessage)
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email exists already'
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email does not exist'
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password'
                break;

            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'INVALID LOGIN CREDENTIALS'
                break;
        }
        return throwError(errorMessage)
    }

    fetchUsers(){
        return this.http.get<UserDetails>('https://sports-buddy-97e8f-default-rtdb.firebaseio.com/users.json')
    }
}
