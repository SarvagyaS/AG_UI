import { Router } from '@angular/router';
import { UserDetails } from './../../definitions/user-details';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { UserService } from 'src/app/services/user.service';
import { UserAddressDetails } from 'src/app/definitions/user-address-details';
import { UploadService } from 'src/app/services/upload-service';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/definitions/constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({ templateUrl: './user-profile.t.html' })

export class UserProfileComponent implements OnInit {

    userDetails: UserDetails;
    postalAddress: UserAddressDetails = {} as UserAddressDetails;
    billingAddress: UserAddressDetails = {} as UserAddressDetails;
    additionalPostalAddress: UserAddressDetails = {} as UserAddressDetails;

    additionalAddress = false;
    profileCompleted = 20;

    constructor(
        private _router: Router,
        private loginService: LoginService,
        private userService: UserService,
        private uploadService: UploadService,
        private http: HttpClient,
        private sanitizer: DomSanitizer
    ) {
        this.loginService.currentUser.subscribe((x) => {
            this.userDetails = x;
        });
    }

    ngOnInit() {
        if (this.userDetails){
            this.getUserDetails();
            this.mapAddress();
        }
    }

    getUserDetails(){
        this.userService.getUserDetails(this.userDetails.id).subscribe(a => {
            if (a.isSuccess && a.data && a.data.id > 0) {
                this.userDetails = a.data;
            }
        });
    }

    mapAddress(){
        this.userService.getUserAddress(this.userDetails.id).subscribe(a => {
            if (a.isSuccess && a.data && a.data.length > 0){
                if (a.data.find(x => x.is_billing_address === false && x.additionAddId !== 1)){
                    this.postalAddress = a.data.find(x => x.is_billing_address === false);
                }
                if (a.data.find(x => x.is_billing_address === true && x.additionAddId !== 1)){
                    this.billingAddress = a.data.find(x => x.is_billing_address === true);
                }
                if (a.data.find(x => x.additionAddId === 1)) {
                  this.additionalAddress = true;
                  this.additionalPostalAddress = a.data.find(x => x.additionAddId === 1);
                }
                const objlength = Object.getOwnPropertyNames(this.userDetails).length;
                const blankValues  = Object.keys(this.userDetails).filter(key =>
                  this.userDetails[key] === null || this.userDetails[key] === '' || this.userDetails[key] === 0).length;
                  this.profileCompleted = Math.ceil((((objlength - blankValues) / objlength) * 100) / 10) * 10;
                  console.log(this.profileCompleted)

            }
        });
    }

    saveUserAdd(){
        var ud: UserAddressDetails;

        // if(fromPostal){
        //     ud = this.postalAddress;
        //     ud.is_billing_address = false;
        //     ud.is_same_as_postal_add = false;
        // }else{
        //     ud = this.billingAddress;
        // }

        this.postalAddress.userDetailsId = this.userDetails.id;
        this.billingAddress.userDetailsId = this.userDetails.id;

        this.postalAddress.is_billing_address = false;
        this.postalAddress.is_same_as_postal_add = false;
        this.userService.saveAddressDetails(this.postalAddress).subscribe((a) => {
            if (a.isSuccess && a.data && a.data.id > 0){
                this.mapAddress();
                alert('Addresses Updated.');
            }
            else{
                alert('Something went wrong.');
            }
        }, (e) => {
            alert('Something went wrong.');
        });

        this.userService.saveAddressDetails(this.billingAddress).subscribe((a) => {
            if (a.isSuccess && a.data && a.data.id > 0){
                this.mapAddress();
            }
            else{
                alert('Something went wrong.');
            }
        }, (e) => {
            alert('Something went wrong.');
        });
    }

    billIsSameAsPost(){
        if (this.billingAddress.is_same_as_postal_add){
            this.billingAddress = JSON.parse(JSON.stringify(this.postalAddress));
            this.billingAddress.id = 0;
            this.billingAddress.is_billing_address = true;
            this.billingAddress.is_same_as_postal_add = true;
        }
    }

    savePersonalDetails(){
        if (!isNaN(this.userDetails.birthDay)) {
            this.userDetails.birthDay = +this.userDetails.birthDay;
        }else{
            this.userDetails.birthDay = null;
        }

        if (!isNaN(this.userDetails.birthMonth)) {
            this.userDetails.birthMonth = + this.userDetails.birthMonth;
        }else{
            this.userDetails.birthMonth = null;
        }
        if (!isNaN(this.userDetails.birthYear)) {
            this.userDetails.birthYear = + this.userDetails.birthYear;
        }else{
            this.userDetails.birthYear = null;
        }
        this.userService.savePersonalDetails(this.userDetails).subscribe(a => {
            if (a.isSuccess && a.data && a.data.id > 0){
                alert('Updated.');
                this.getUserDetails();
            }
        });
    }

    saveBankDetails(){
        this.userService.saveBankDetails(this.userDetails).subscribe(a => {
            if (a.isSuccess && a.data && a.data.id > 0){
                alert('Updated.');
                this.getUserDetails();
            }
        });
    }

    public uploadFile = (files) => {
        if (files.length === 0) {
          return;
        }
        const filesToUpload : File[] = files;
        const formData = new FormData();

        Array.from(filesToUpload).map((file, index) => {
          return formData.append('file' + index, file, file.name);
        });


        this.http.post(Constants.apiBaseUrl + '/Upload/UploadImage', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
          console.log('uploaded');
        });
        // this.uploadService.upload(formData).subscribe(c=> {
        //     if (c.isSuccess && c.data && c.data.length > 0){
        //         alert("Updated.");
        //     }
        // } );
      }

      getUrl(){
          return Constants.baseUrl + "\\" + this.userDetails.profilePicUrl;
        // return this.sanitizer.bypassSecurityTrustResourceUrl(this.userDetails.profilePicUrl);
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



      save() {
        this.postalAddress.name = this.userDetails.first_name;
        delete this.postalAddress.userDetails;
        delete this.billingAddress.userDetails;
        this.billingAddress.is_billing_address = true;
        this.postalAddress.is_billing_address = false
        this.billingAddress.additionAddId = 0;
        this.postalAddress.additionAddId = 0;
        this.billingAddress.name = this.userDetails.first_name;
        this.postalAddress.name = this.userDetails.first_name;
        let add;
        if (this.additionalAddress) {
            delete this.additionalPostalAddress.userDetails;
            this.additionalPostalAddress.is_billing_address = false;
            this.additionalPostalAddress.additionAddId = 1;
          add = [ this.postalAddress, this.billingAddress, this.additionalPostalAddress ] as UserAddressDetails[];
        } else {
          add = [ this.postalAddress, this.billingAddress ] as UserAddressDetails[];
        }
        this.userDetails.userAddressDetails = add;
        if (!isNaN(this.userDetails.birthDay)) {
          this.userDetails.birthDay = +this.userDetails.birthDay;
      }else{
          this.userDetails.birthDay = null;
      }

        if (!isNaN(this.userDetails.birthMonth)) {
          this.userDetails.birthMonth = + this.userDetails.birthMonth;
      }else{
          this.userDetails.birthMonth = null;
      }
        if (!isNaN(this.userDetails.birthYear)) {
          this.userDetails.birthYear = + this.userDetails.birthYear;
      }else{
          this.userDetails.birthYear = null;
      }
        this.userService.savePersonalDetails(this.userDetails).subscribe(d => {
          if (d.isSuccess && d.data && d.data.id > 0){
              this.getUserDetails();
              this.mapAddress();
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

