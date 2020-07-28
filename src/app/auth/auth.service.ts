import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const API_KEY = "AIzaSyB8cL5aoZxOmGevRqVtAUbvtIQwSDBr8_o";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`, {
            email, password, returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let error = "An Unknown Error Occurred!";
            console.log({errorRes})
            switch(errorRes?.error?.error?.message) {
                case 'EMAIL_EXISTS':
                    error = "This email exixts already";
            }
            return throwError(error);
        }))
    }
}