import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent { 
    isLoginMode = false;
    isLoading = false;
    error = null;
    @ViewChild('authForm') form: NgForm;

    constructor(private authService: AuthService) {
        
    }
    
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmitAuthForm() {
        if(!this.form.valid) return;
        const { value: { email, password } } = this.form;
        this.isLoading = true;
        if(this.isLoginMode) {
            
        } else {
            this.authService.signup(email, password).subscribe(resData => {
                console.log(resData)
                this.isLoading = false;
            }, error => {
                this.error = "An Error Occurred!";
                this.isLoading = false;
            });
            this.form.reset()
        }
    }
}