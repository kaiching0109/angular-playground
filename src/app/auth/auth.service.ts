import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

const API_KEY = "AIzaSyB8cL5aoZxOmGevRqVtAUbvtIQwSDBr8_o";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${SIGN_UP_URL}${API_KEY}`, {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            const { email, localId, idToken, expiresIn } = resData;
            this.handleAuthentication(email, localId, idToken, +expiresIn);
        }))
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${SIGN_IN_URL}${API_KEY}`, {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            const { email, localId, idToken, expiresIn } = resData;
            this.handleAuthentication(email, localId, idToken, +expiresIn);
        }))
    }

    signout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    handleError(errorRes: HttpErrorResponse) {
        let error = "An Unknown Error Occurred!";
        console.log({errorRes})
        switch(errorRes?.error?.error?.message) {
            case 'EMAIL_EXISTS':
                error = "This email exixts already.";
                break;
            case 'EMAIL_NOT_FOUND':
                error = "This email does not exist.";
                break;
            case 'INVALID_PASSWORD':
                error = "Wrong password";
                break;
        }
        return throwError(error);
    }
}