import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateURModalComponent } from '../../createURModal/create-urmodal/create-urmodal.component';
import { DeleteUserRoleDialogComponent } from './deleteUserRoleDialog/delete-user-role-dialog/delete-user-role-dialog.component';

NgModule({
imports: [
  MatDialogModule,
  FormsModule, 
  MatInputModule, 
  MatButtonModule],
})

export interface DialogData {
  id : number;
  roleName: string;
  accessLevel: string;
}

interface Role {
  id : number;
  roleName: string;
  accessLevel: string;
}

@Component({
  selector: 'app-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  styleUrls: ['./view-user-roles.component.scss']
})

export class ViewUserRolesComponent {

  role: Role [] = [
    {id: 1, roleName: 'Tenant', accessLevel: 'Access Level 3'},
    {id: 2, roleName: 'Admin', accessLevel: 'Access Level 1'},
    {id: 3, roleName: 'Contractor', accessLevel: 'Access Level 4'},
    {id: 4, roleName: 'Employee', accessLevel: 'Access Level 2'}
  ];

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ViewUserRolesComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  //Create Modal
  openModal(): void {
    const dialogRef = this.dialog.open(CreateURModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newRole: Role = {
          id: this.role.length + 1,
          roleName: result.roleName,
          accessLevel: result.accessLevel
        };
        this.role.push(newRole);
        this.search();
      }
    });
  }

  //Delete Dialog
  openDeleteUserDialog(role: Role): void {
    const dialogRef = this.dialog.open(DeleteUserRoleDialogComponent, {
      width: '300px',
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.role = this.role.filter(u => u.id !== role.id);
        this.filtered = this.filtered.filter(u => u.id !== role.id);
      }
    });
  }

  //Update Modal
  /*openUpdateUserModal(): void {
    const dialogRef = this.dialog.open(UpdateUserModalComponent, {
    });
  }*/

  //Search
    searchTerm: string = '';
    filtered: Role [] = [];
    
    constructor(public dialog: MatDialog) {
      this.filtered = this.role;
    }
  
    search() {
      this.filtered = this.role.filter(u => {
        const searchLower = this.searchTerm.toLowerCase();
        const roleNameLower = u.roleName.toLowerCase(); // Use 'roleName', not 'role'
        return roleNameLower.includes(searchLower);
      });
    }
}