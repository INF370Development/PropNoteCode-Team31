import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEmployeeComponent } from '../../add-employee-modal/add-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';




NgModule({
  imports: [
    MatDialogModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatIcon],
  }) 
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  
})


export class ViewEmployeeComponent  {
  employeeData: Array<any>;
data: any;



  constructor(public dialog: MatDialog) {
    this.employeeData = [
      { empId:1 , name: 'Doe', surname:"doe", phoneNumber: 12345678, email: "nonono@love.com", photo:"photo" },
      { empId:2 , name: 'Doe', surname:"doe", phoneNumber: 12345678, email: "nonono@love.com", photo:"photo" },
      { empId:3 , name: 'Doe', surname:"doe", phoneNumber: 12345678, email: "nonono@love.com", photo:"photo" },
      { empId:4 , name: 'Doe', surname:"doe", phoneNumber: 12345678, email: "nonono@love.com", photo:"photo" },
  ];

  }

  

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(AddEmployeeComponent, {
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
  const dialogRef = this.dialog.open(AddEmployeeComponent, {
  })
}

}


