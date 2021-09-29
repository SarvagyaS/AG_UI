import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDetails } from './../definitions/user-details';
import { BaseApiService } from './base-service';
import { UserAddressDetails } from '../definitions/user-address-details';
import { ApiResponse } from '../definitions/api-response';
@Injectable({
    providedIn: 'root'
})

export class UserService {

    private readonly prefix = '/user';

    constructor(private apiService: BaseApiService) {
    }
    
    public register(ud: UserDetails): Observable<ApiResponse<UserDetails>> {
        return this.apiService.post(this.prefix + '/Register', null, ud);
    }

    public getUserAddress(id: number): Observable<ApiResponse<UserAddressDetails[]>> {
        return this.apiService.get(this.prefix + '/GetUserAddress?Id=' + id, null);
    }

    public saveAddressDetails(ud: UserAddressDetails): Observable<ApiResponse<UserAddressDetails>> {
        return this.apiService.post(this.prefix + '/SaveAddressDetails', null, ud);
    }
}