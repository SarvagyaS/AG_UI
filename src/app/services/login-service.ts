import { Injectable } from '@angular/core';
import { BaseApiService } from './base-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../definitions/login';
import { UserDetails } from '../definitions/user-details';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private readonly prefix = '/user';
    private currentUserSubject: BehaviorSubject<UserDetails>;
    public currentUser: Observable<UserDetails>;
    
    constructor(private apiService: BaseApiService) {
        this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserDetails {
        return this.currentUserSubject.value;
    }
    
    public authenticate(un: string, password: string) {
        var kvp: Login = { Username: un, Password: password };
        return this.apiService.post(this.prefix + '/Authenticate', null, kvp)
        .pipe(map((d:UserDetails) => {
            if(d.id != 0){
                localStorage.setItem('currentUser', JSON.stringify(d));
                this.currentUserSubject.next(d);
            }   
            return d;
        }));
    }

    public logout(reloadPage: boolean = true): void {
        localStorage.removeItem('currentUser');
        if(reloadPage){
            window.location.reload();
        }
        this.currentUserSubject.next(null);
    }
}