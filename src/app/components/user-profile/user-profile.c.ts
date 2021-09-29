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
            this.mapAddress();
        }
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

    saveUserAdd(fromPostal: boolean){
        var ud: UserAddressDetails;
        if(fromPostal){
            ud = this.postalAddress;
            ud.is_billing_address = false;
            ud.is_same_as_postal_add = false;
        }else{
            ud = this.billingAddress;
        }
        ud.userDetailsId = this.userDetails.id;
        this.userService.saveAddressDetails(ud).subscribe((a)=>{
            if (a.isSuccess && a.data && a.data.id > 0){
                this.mapAddress();
                alert("Add Updated.");
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
}