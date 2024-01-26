import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Library creation app';

  constructor(
    public authService: AuthenticationService,
  ) {}

  isLoggedIn() {
    return true;
    //return this.authService.isAuthenticated();
  }
}
