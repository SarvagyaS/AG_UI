import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDetails } from './../definitions/user-details';
import { BaseApiService } from './base-service';
import { UserAddressDetails } from '../definitions/user-address-details';
@Injectable({
    providedIn: 'root'
})

export class UserService {

    private readonly prefix = '/user';

    constructor(private apiService: BaseApiService) {
    }
    
    public register(ud: UserDetails): Observable<UserDetails> {
        return this.apiService.post(this.prefix + '/Register', null, ud);
    }

    public saveAddressDetails(ud: UserAddressDetails): Observable<UserAddressDetails> {
        return this.apiService.post(this.prefix + '/SaveAddressDetails', null, ud);
    }
}