import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateUModalComponent } from '../../createUModal/create-umodal/create-umodal.component';
import { DeleteUserDialogComponent } from './deleteUserDialog/delete-user-dialog/delete-user-dialog.component';
import { UpdateUserModalComponent } from './updateUserModal/update-user-modal/update-user-modal.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';

NgModule({
  imports: [
    MatDialogModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule],
  }) 

  interface User {
    id: number;
    email: string;
    userRole: string;
  }

  export interface DialogData {
    id : number;
    email: string;
    userRole: string;
  } 

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})

export class ViewUsersComponent {
  
  user: User [] = [
    {id: 1, email: 'pietvz@construction.ac.za', userRole: 'Tenant'},
    {id: 2, email: 'eric@propco.co.za', userRole: 'Admin'},
    {id: 3, email: 'brendan@edimension.co.za', userRole: 'Employee'},
    {id: 4, email: 'fanta@tastic.ac.za', userRole: 'Contractor'}
  ];

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ViewUsersComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  //Create Modal
  openModal(): void {
    const dialogRef = this.dialog.open(CreateUModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUser: User = {
          id: this.user.length + 1,
          email: result.email,
          userRole: result.userRole
        };
        this.user.push(newUser);
        this.search();
      }
    });
  }

  //Delete Dialog
  openDeleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '300px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.user = this.user.filter(u => u.id !== user.id);
        this.filtered = this.filtered.filter(u => u.id !== user.id);
      }
    });
  }

  //Update Modal
  openUpdateUserModal(): void {
    const dialogRef = this.dialog.open(UpdateUserModalComponent, {
    });
  }

  //Search
    searchTerm: string = '';
    filtered: User [] = [];
    
    constructor(public dialog: MatDialog) {
      this.filtered = this.user;
    }
  
    search() {
      this.filtered = this.user.filter(u => {
        const searchLower = this.searchTerm.toLowerCase();
        const emailLower = u.email.toLowerCase();
        return emailLower.includes(searchLower);
      });
    }
}