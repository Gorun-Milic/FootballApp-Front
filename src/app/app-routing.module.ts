import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { ClubProfileComponent } from './components/club-profile/club-profile.component';
import { DisplayClubComponent } from './components/display-club/display-club.component';
import { DisplayPlayerComponent } from './components/display-player/display-player.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SavedComponent } from './components/saved/saved.component';
import { SearchClubComponent } from './components/search-club/search-club.component';
import { SearchPlayerComponent } from './components/search-player/search-player.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TokenGuard } from './guards/token.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch:'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'club-profile', component: ClubProfileComponent, canActivate: [TokenGuard]},
  {path: 'add-player', component: AddPlayerComponent, canActivate: [TokenGuard]},
  {path: 'search-club', component: SearchClubComponent, canActivate: [TokenGuard]},
  {path: 'search-player', component: SearchPlayerComponent, canActivate: [TokenGuard]},
  {path: 'displayclub/:clubid', component: DisplayClubComponent, canActivate: [TokenGuard]},
  {path: 'displayplayer/:playerid', component: DisplayPlayerComponent, canActivate: [TokenGuard]},
  {path: 'saved', component: SavedComponent, canActivate: [TokenGuard]},
  {path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
