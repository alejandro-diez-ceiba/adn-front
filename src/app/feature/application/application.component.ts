import { Component } from '@angular/core';
import { LoginService } from '@app/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {

  constructor(
    private readonly loginSv: LoginService
  ) { }

  logout(): void {
    this.loginSv.logout();
  }

}
