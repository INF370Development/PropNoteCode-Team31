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

  tableData: Role [] = [
    {id: 1, roleName: 'Tenant', accessLevel: 'Access Level 3'},
    {id: 2, roleName: 'Admin', accessLevel: 'Access Level 1'},
    {id: 3, roleName: 'Contractor', accessLevel: 'Access Level 4'},
    {id: 4, roleName: 'Employee', accessLevel: 'Access Level 2'}
  ];

  constructor(public dialog: MatDialog) {}

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
        this.tableData.push({
          id: this.tableData.length + 1, 
          roleName: result.roleName,
          accessLevel: result.accessLevel
        });
      }
    });
  }

  //Delete Dialog
  openDeleteUserRoleDialog(role: Role): void {
    const dialogRef = this.dialog.open(DeleteUserRoleDialogComponent, {
      width: '300px',
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        // Delete the user from the tableData array
        this.tableData = this.tableData.filter(u => u.id !== role.id);
      }
    });
  }

  //Search
    searchTerm: string = '';

    filteredData: Role[] = [];
  
    search() {
        this.filteredData = this.tableData.filter((row) =>
          row.roleName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
  }