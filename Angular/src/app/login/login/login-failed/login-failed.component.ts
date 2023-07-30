import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss']
})
export class LoginFailedComponent {
  constructor(private dialogRef: MatDialogRef<LoginFailedComponent>)
  {

  }
  Retry() {
    this.dialogRef.close();
  }

}
