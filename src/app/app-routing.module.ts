import { UserProfileComponent } from './components/user-profile/user-profile.c';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.c';
import { CareersComponent } from './components/careers/careers.c';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.c';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'who-we-are',
    component: WhoWeAreComponent
  },
  {
    path: '**',
    component: RegistrationComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }