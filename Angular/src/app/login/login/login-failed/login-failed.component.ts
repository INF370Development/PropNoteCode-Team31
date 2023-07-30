import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatCardModule],
})
export class LoginFailedComponent {
  constructor(private router:Router)
  {

  }
  Retry()
  {

  }
}
