import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
        })
    }
}