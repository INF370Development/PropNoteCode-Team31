import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/UserModels/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserModel } from 'src/app/shared/UserModels/CreateUserModel';
import { Role } from '../../../viewUserRoles/view-user-roles/updateUserRoleModal/update-user-role-modal/update-user-role-modal.component';
import { KRole } from 'src/app/shared/UserModels/KRole';

@Component({
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss'],
})
export class CreateUserModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  userModal: CreateUserModel = {
    Name: '',
    Username: '',
    userRole: '',
    Email: '',
  };

  RoleList: KRole[] = [];
  constructor(
    private dialogRef: MatDialogRef<CreateUserModalComponent>,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getRoles().subscribe((response) => {
      this.RoleList = response;
      console.log('asfedfhgrfsdghfdghfdgh', response);
      console.log('Role List', this.RoleList);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
  CreateNewUser() {
    this.userService.createNewUser(this.userModal).subscribe(
      (response) => {
        debugger;
        console.log('User created successfully:', response);
        this.dialogRef.close({ success: true, user: this.userModal });
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
