import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GetBrowserName } from "src/app/helpers/get-browser-name.f";
import { LoginService } from "src/app/services/login-service";
import { UserService } from "src/app/services/user.service";

@Component({ templateUrl: './registration.t.html' })

export class RegistrationComponent implements OnInit {
    title = 'AG';
    registerForm: FormGroup;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    registerModal: boolean = false;
  
    constructor(
        private _router: Router,
      private formBuilder: FormBuilder,
      private userService: UserService,
      private loginService: LoginService,
      ) {
    }
  
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        Id: [0],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', [Validators.required]],
        user_agent: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['']
      }, { validator: this.checkIfMatchingPasswords('password', 'confirm_password') });
  
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required]],
      });
    }
  
    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({ notEquivalent: true })
        }
        else {
          return passwordConfirmationInput.setErrors(null);
        }
      }
    }
  
    get f() { return this.registerForm.controls; }
  
    onRegistrationSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      this.registerForm.controls.user_agent.setValue(GetBrowserName());
      this.userService.register(this.registerForm.value)
        .subscribe(
          d => {
            if (d.isSuccess && d.data && d.data.id > 0){
              alert("Registered");
              this.registerModal = false;
            }
            else{
              alert("Not Registered");
            }
          },
          error => {
            alert("Not Registered");
            this.loading = false;
          });
    }
  
  
  
    //////////////////////// LOGIN
    get l() { return this.loginForm.controls; }
  
    onLoginSubmit(){
      if (this.loginForm.invalid) {
        return;
      }
      this.loginService.authenticate(this.l.username.value,this.l.password.value).subscribe(z=>{
        if(z.id > 0){
            if(!z.is_profile_update){
                this._router.navigate(['user-profile']);
            }
            else{
                alert("Your profile is filled.");
            }
        }
        else{
          alert("logged failed");
        }
      })
    }

    forgotPassword(){
      if(!this.l.username.value){
        alert("Please enter username.");
      }else{
        alert("Passowrd reset link has been sent to your registered email.");
      }
    }
}