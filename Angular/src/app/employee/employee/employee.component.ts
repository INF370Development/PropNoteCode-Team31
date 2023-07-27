import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  displayedColums: string [] = [
    'id',
    'firstName',
    'lastName',
    'email',
  ];
  dataSource!: MatTableDataSource<any>;
  
} {

}
