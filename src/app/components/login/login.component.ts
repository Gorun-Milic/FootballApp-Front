import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/dto/AuthenticationRequest';
import { Clubdto } from 'src/app/dto/Clubdto';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public clubModel = new Clubdto(undefined, '', undefined, undefined, undefined, '', '');

  constructor(private clubService: ClubService, private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  authenticate(loginForm) {
    if (loginForm.valid) {
      this.clubService.authenticate(new AuthenticationRequest(this.clubModel.name, this.clubModel.password)).subscribe(
        (res)=>{
          localStorage.setItem('token', res.jwt);
          this.login();
        },
        (error)=>{
          this.notificationService.showError("Wrong credentials", "Error");
        }
      )
    }else {
      this.notificationService.showError("All fields are required", "Error");
    }
  }

  login() {
      this.clubService.login(this.clubModel).subscribe(
        data => {
          this.authService.setClub(data);
          this.notificationService.showSuccess("Welcome", "Success");
          this.router.navigate(['club-profile']);
        },
        error => {
          this.notificationService.showError("Wrong credentials", "Error");
      });
    }
    
}
