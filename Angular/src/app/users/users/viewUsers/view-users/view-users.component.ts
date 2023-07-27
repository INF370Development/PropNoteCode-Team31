import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateUModalComponent } from '../../createUModal/create-umodal/create-umodal.component';

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

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})

export class ViewUsersComponent {

  constructor(public dialog: MatDialog) {}

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
  
    search() {
      console.log('Search term:', this.searchTerm);
    }


    openModal() {
      const dialogRef = this.dialog.open(CreateUModalComponent, {
      })
    }
  }