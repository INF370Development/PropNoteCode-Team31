import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateUModalComponent } from '../../createUModal/create-umodal/create-umodal.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

NgModule({
  imports: [
    MatDialogModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule],
  }) 

  interface TableRow {
    id : number;
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

  tableData: TableRow [] = [
    {id: 1, email: 'pietvz@construction.ac.za', userRole: 'Tenant'},
    {id: 2, email: 'eric@propco.co.za', userRole: 'Admin'},
    {id: 3, email: 'brendan@edimension.co.za', userRole: 'Employee'},
    {id: 4, email: 'fanta@tastic.ac.za', userRole: 'Contractor'}
  ];

  constructor(public dialog: MatDialog) {
    this.filteredData = this.tableData;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ViewUsersComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDeleteDiaglog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ViewUsersComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

    searchTerm: string = '';

    filteredData: TableRow[] = [];
  
    search() {
        this.filteredData = this.tableData.filter((row) =>
          row.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    openModal() {
      const dialogRef = this.dialog.open(CreateUModalComponent, {
      })
    }
  }