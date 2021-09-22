import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomePageNavigationComponent } from './components/home-page-navigation/home-page-navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClubProfileComponent } from './components/club-profile/club-profile.component';
import {MatTableModule} from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DeletePlayerComponent } from './components/dialog/delete-player/delete-player.component';
import { ChartComponent } from './components/chart/chart.component';
import { EditPlayerComponent } from './components/dialog/edit-player/edit-player.component';
import { SearchClubComponent } from './components/search-club/search-club.component';
import { SearchPlayerComponent } from './components/search-player/search-player.component';
import { DisplayClubComponent } from './components/display-club/display-club.component';
import { DisplayPlayerComponent } from './components/display-player/display-player.component';
import { SavedComponent } from './components/saved/saved.component';
import { BuyPlayerComponent } from './components/dialog/buy-player/buy-player.component';
import { IsSavedDirective } from './directives/is-saved.directive';
import { DatePipe } from '@angular/common';
import { TokenInterceptor } from './interceptors/token';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomePageNavigationComponent,
    HomePageComponent,
    SignUpComponent,
    ClubProfileComponent,
    FooterComponent,
    AddPlayerComponent,
    NavigationComponent,
    DeletePlayerComponent,
    ChartComponent,
    EditPlayerComponent,
    SearchClubComponent,
    SearchPlayerComponent,
    DisplayClubComponent,
    DisplayPlayerComponent,
    SavedComponent,
    BuyPlayerComponent,
    IsSavedDirective
  ],
  entryComponents: [DeletePlayerComponent, EditPlayerComponent, BuyPlayerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule, 
    MatOptionModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  providers: [DatePipe, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
