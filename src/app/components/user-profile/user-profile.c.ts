import { Router } from '@angular/router';
import { UserDetails } from './../../definitions/user-details';
import { Component, OnInit } from "@angular/core";

@Component({ templateUrl: './user-profile.t.html' })

export class UserProfileComponent implements OnInit{

    userDetails: UserDetails;

    constructor(
        private _router: Router,
    ) {
            
    }

    ngOnInit() {
        var u = localStorage.getItem('currentUser');
        if(u){
            this.userDetails = JSON.parse(u) as UserDetails;
        }
        else{
            this._router.navigate(['login']);
        }
    }
    
}