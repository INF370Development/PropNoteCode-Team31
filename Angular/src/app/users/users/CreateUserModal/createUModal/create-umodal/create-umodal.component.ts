import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/User';

@Component({
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss']
})
export class CreateUModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  userModal: User = {
    id: +1,
    email: '',
    userRole: '',
  };

  constructor(
    private dialogRef: MatDialogRef<CreateUModalComponent>,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  CreateUser() {
    this.userService.createUser(this.userModal).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.dialogRef.close({success: true, user: this.userModal}); 
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}

/*import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule
  ],
})

@Component({
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss']
})

export class CreateUModalComponent {
  email: string = '';
  userRole: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateUModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal() {
    this.dialogRef.close();
  }

  createUser(): void {
    this.dialogRef.close({ email: this.email, userRole: this.userRole });
  }
}*/