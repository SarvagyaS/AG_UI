import { UserProfileComponent } from './components/user-profile/user-profile.c';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.c';
import { CareersComponent } from './components/careers/careers.c';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.c';
import { LiveAuctionComponent } from './components/live-auction/live-auction.c';

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
    path: 'live-auctions',
    component: LiveAuctionComponent
  },
  {
    path: '**',
    component: RegistrationComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }