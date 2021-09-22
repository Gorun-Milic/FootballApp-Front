import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Clubdto } from 'src/app/dto/Clubdto';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { LeagueService } from 'src/app/services/league.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() onRegister: EventEmitter<any> = new EventEmitter<any>();

  public clubModel = new Clubdto(undefined, '', undefined, undefined, undefined, '', '');

  leagues = [];

  constructor(private leagueService: LeagueService, private clubService: ClubService, private authService: AuthService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.leagueService.getLeagues().subscribe(
      (data)=>{
        this.leagues = data;
      }
    );
  }

  register(registerForm) {
    if (registerForm.valid) {
      this.clubService.register(this.clubModel).subscribe(data => {
        this.authService.setClub(data);
        this.notificationService.showSuccess("Account created successfuly", "Success");
        this.onRegister.emit(); 
      });;
    }else {
      this.notificationService.showError("All fields are required", "Error");
    }
  }

}
