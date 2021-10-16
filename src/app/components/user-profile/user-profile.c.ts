import { Router } from '@angular/router';
import { UserDetails } from './../../definitions/user-details';
import { Component, OnInit } from "@angular/core";
import { LoginService } from 'src/app/services/login-service';
import { UserService } from 'src/app/services/user.service';
import { UserAddressDetails } from 'src/app/definitions/user-address-details';

@Component({ templateUrl: './user-profile.t.html' })

export class UserProfileComponent implements OnInit {

    userDetails: UserDetails;
    postalAddress: UserAddressDetails = {} as UserAddressDetails;
    billingAddress: UserAddressDetails = {} as UserAddressDetails;
    additionalPostalAddress: UserAddressDetails[] = [];

    constructor(
        private _router: Router,
        private loginService: LoginService,
        private userService: UserService
    ) {
        this.loginService.currentUser.subscribe((x) => {
            this.userDetails = x;
        });
    }

    ngOnInit() {
        if(this.userDetails){
            this.getUserDetails();
            this.mapAddress();
        }
    }

    getUserDetails(){
        this.userService.getUserDetails(this.userDetails.id).subscribe(a=>{
            if (a.isSuccess && a.data && a.data.id > 0) {
                this.userDetails = a.data;
            }
        })
    }

    mapAddress(){
        this.userService.getUserAddress(this.userDetails.id).subscribe(a => {
            if(a.isSuccess && a.data && a.data.length > 0){
                if(a.data.find(x=>x.is_billing_address == false)){
                    this.postalAddress = a.data.find(x=>x.is_billing_address == false);
                }
                if(a.data.find(x=>x.is_billing_address == true)){
                    this.billingAddress = a.data.find(x=>x.is_billing_address == true);
                }
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
        this.userService.saveAddressDetails(this.postalAddress).subscribe((a)=>{
            if (a.isSuccess && a.data && a.data.id > 0){
                this.mapAddress();
                alert("Addresses Updated.");
            }
            else{
                alert("Something went wrong.");
            }
        }, (e)=>{
            alert("Something went wrong.");
        });

        this.userService.saveAddressDetails(this.billingAddress).subscribe((a)=>{
            if (a.isSuccess && a.data && a.data.id > 0){
                this.mapAddress();
            }
            else{
                alert("Something went wrong.");
            }
        }, (e)=>{
            alert("Something went wrong.");
        });
    }

    billIsSameAsPost(){
        if(this.billingAddress.is_same_as_postal_add){
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
            this.userDetails.birthMonth = + this.userDetails.birthMonth
        }else{
            this.userDetails.birthMonth = null;
        }
        if (!isNaN(this.userDetails.birthYear)) {
            this.userDetails.birthYear = + this.userDetails.birthYear;
        }else{
            this.userDetails.birthYear = null;
        }
        this.userService.savePersonalDetails(this.userDetails).subscribe(a=>{
            if (a.isSuccess && a.data && a.data.id > 0){
                alert("Updated.");
                this.getUserDetails();
            }
        });
    }

    saveBankDetails(){
        this.userService.saveBankDetails(this.userDetails).subscribe(a=>{
            if (a.isSuccess && a.data && a.data.id > 0){
                alert("Updated.");
                this.getUserDetails();
            }
        });
    }

    saveAdditionalAdd(i: number){
    }

    addNewAddress(){
        this.additionalPostalAddress.push({} as UserAddressDetails);
    }
}