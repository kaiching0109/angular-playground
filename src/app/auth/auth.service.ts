import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const API_KEY = "AIzaSyB8cL5aoZxOmGevRqVtAUbvtIQwSDBr8_o";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=";
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
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${SIGN_UP_URL}${API_KEY}`, {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleError))
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${SIGN_IN_URL}${API_KEY}`, {
            email, password, returnSecureToken: true
        }).pipe(catchError(this.handleError))
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