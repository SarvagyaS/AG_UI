
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseApiService } from './services/base-service';
import { LoginService } from './services/login-service';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { RegistrationComponent } from './components/registration/registration.c';
import { UserProfileComponent } from './components/user-profile/user-profile.c';
import { CareersComponent } from './components/careers/careers.c';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.c';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UserProfileComponent,
    CareersComponent,
    WhoWeAreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    BaseApiService,
    UserService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
