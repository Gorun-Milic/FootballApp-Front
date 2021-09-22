import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loginForm: boolean = true;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  switchComponent() {
    this.loginForm = !this.loginForm;
  }

}
