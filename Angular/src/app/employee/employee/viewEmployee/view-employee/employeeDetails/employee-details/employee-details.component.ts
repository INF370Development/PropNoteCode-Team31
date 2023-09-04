import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/UserModels/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

NgModule({
  imports: [
  MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
});

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements AfterViewInit {
  employeeDetail: Employee = new Employee();

  constructor(public dialog: MatDialog, private _employeeService: EmployeeService, private route:ActivatedRoute) {
    console.log("employee details", Employee)
  }

  ngAfterViewInit(): void {
    this.loadContractor();
  }

  
  loadContractor() {
    this._employeeService.getEmployee(this.route.snapshot.params['id'], this.employeeDetail).subscribe((result) => {
      console.log("Employee Result", result);
    });
  }
}