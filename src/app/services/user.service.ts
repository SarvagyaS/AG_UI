import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDetails } from './../definitions/user-details';
import { BaseApiService } from './base-service';
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
}