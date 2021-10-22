import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAddressDetails } from 'src/app/definitions/user-address-details';
import { UserDetails } from 'src/app/definitions/user-details';
import { GetBrowserName } from 'src/app/helpers/get-browser-name.f';
import { LoginService } from 'src/app/services/login-service';
import { UserService } from 'src/app/services/user.service';

@Component({ templateUrl: './registration.t.html' })

export class RegistrationComponent implements OnInit {
    title = 'AG';
    // registerForm: FormGroup;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    loginSubmitted = false;
    registerModal = false;
    isUserNameSelected: string;
    registrationForm: UserDetails = {userAddressDetails: [] as UserAddressDetails[]} as UserDetails;
    postalAddress: UserAddressDetails = {} as UserAddressDetails;
    billingAddress: UserAddressDetails = {} as UserAddressDetails;
    additionalPostalAddress: UserAddressDetails = {} as UserAddressDetails;
    additionalAddress =  false;


    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private loginService: LoginService,
      ) {
    }

    ngOnInit() {
      this.billingAddress.is_same_as_postal_add = false;
      this.loginForm = this.formBuilder.group({
        username: [],
        password: [],
        phoneNo: [],
      });
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        const passwordInput = group.controls[passwordKey];
        const passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({ notEquivalent: true });
        }
        else {
          return passwordConfirmationInput.setErrors(null);
        }
      };
    }

    public onBillingAddressClick() {
      this.billingAddress.is_same_as_postal_add = !this.billingAddress.is_same_as_postal_add;
      if (this.billingAddress.is_same_as_postal_add) {
        this.postalAddress.is_billing_address = false;
        const add = JSON.parse(JSON.stringify(this.postalAddress));
        add.is_same_as_postal_add = true;
        this.billingAddress = add;
        this.billingAddress.is_billing_address = true;
      } else {
        const userAddressDetails: UserAddressDetails = {} as UserAddressDetails;
        this.postalAddress.is_billing_address = true;
        this.billingAddress = userAddressDetails;
        this.billingAddress.is_same_as_postal_add = false;
      }
    }


    public addAdditionalAddress(event: any) {
      this.additionalAddress = event.target.checked;
      if (this.additionalAddress) {
        this.billingAddress.is_billing_address = false;
        this.postalAddress.is_billing_address = false;
        const userAddressDetails: UserAddressDetails = {} as UserAddressDetails;
        this.additionalPostalAddress = userAddressDetails;
        this.additionalPostalAddress.is_billing_address = true;
      } else {
        const userAddressDetails: UserAddressDetails = {} as UserAddressDetails;
        this.billingAddress.is_billing_address = true;
        this.additionalPostalAddress = userAddressDetails;
      }
    }


    //////////////////////// LOGIN
    get l() { return this.loginForm.controls; }

    onLoginSubmit(){
      this.loginSubmitted = true;
      let a = true;
      if (this.isUserNameSelected === 'false') {
        a = false;
      }
      this.loginService.authenticate(this.l.username.value, this.l.password.value, this.l.phoneNo.value, a).subscribe(z => {
        if (z.id > 0){
            if (!z.is_profile_update){
                this._router.navigate(['user-profile']);
            }
            else{
                alert('Your profile is filled.');
            }
        }
        else{
          alert('logged failed');
        }
      });
    }

    forgotPassword(){
      if (!this.l.mobile.value){
        alert('Please enter mobile.');
      }else{
        alert('Passowrd reset link has been sent to your registered email.');
      }
    }


    submitReg() {
      this.postalAddress.name = this.registrationForm.first_name;
      delete this.postalAddress.userDetails;
      delete this.billingAddress.userDetails;
      let add;
      if (this.additionalAddress) {
        delete this.additionalPostalAddress.userDetails;
        this.additionalPostalAddress.additionAddId = 1;
        add = [ this.postalAddress, this.billingAddress, this.additionalPostalAddress ] as UserAddressDetails[];
      } else {
        add = [ this.postalAddress, this.billingAddress ] as UserAddressDetails[];
      }
      this.registrationForm.userAddressDetails = add;
      if (!isNaN(this.registrationForm.birthDay)) {
        this.registrationForm.birthDay = +this.registrationForm.birthDay;
    }else{
        this.registrationForm.birthDay = null;
    }

      if (!isNaN(this.registrationForm.birthMonth)) {
        this.registrationForm.birthMonth = + this.registrationForm.birthMonth;
    }else{
        this.registrationForm.birthMonth = null;
    }
      if (!isNaN(this.registrationForm.birthYear)) {
        this.registrationForm.birthYear = + this.registrationForm.birthYear;
    }else{
        this.registrationForm.birthYear = null;
    }
      this.userService.savePersonalDetails(this.registrationForm).subscribe(d => {
        if (d.isSuccess && d.data && d.data.id > 0){
                  alert('Registered');
        //          this.registerModal = false;
                }
                else{
                  alert('Not Registered');
                }
              },
              error => {
                alert('Not Registered');
          //      this.loading = false;
              });
    }
}
