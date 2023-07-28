import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateURModalComponent } from '../../createURModal/create-urmodal/create-urmodal.component';

NgModule({
imports: [
  MatDialogModule,
  FormsModule, 
  MatInputModule, 
  MatButtonModule],
})

export interface DialogData {
  name: string;
  description: string;
  access: string;
}

interface TableRow {
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

  tableData: TableRow [] = [
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

  openDeleteDiaglog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ViewUserRolesComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

    searchTerm: string = '';
  
    search() {
      console.log('Search term:', this.searchTerm);
    }


    openModal() {
      const dialogRef = this.dialog.open(CreateURModalComponent, {
      })
    }
  }