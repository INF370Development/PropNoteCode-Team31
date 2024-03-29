import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/shared/UserModels/Employee';
import { CreateEmployeeModalComponent } from './createEmployeeModal/create-employee-modal/create-employee-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { DeleteEmployeeDialogComponent } from './deleteEmployeeDialog/delete-employee-dialog/delete-employee-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})

export class ViewEmployeeComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'jobTitle',
    'detailsButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private _employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this._employeeService.getEmployees().subscribe((employees: any) => {
      this.dataSource.data = employees;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.user.name.toLowerCase().includes(lowerCaseFilter) ||
        data.user.surname.toLowerCase().includes(lowerCaseFilter) ||
        data.user.email.toLowerCase().includes(lowerCaseFilter) ||
        data.user.phoneNumber.includes(filter) ||
        data.jobTitle.toLowerCase().includes(lowerCaseFilter)       
      );
    };

    this.dataSource.filter = filterValue;
  }

  /*showSnackBar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
      'Deleted successfully',
      'X',
      { duration: 500 }
    );
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
  }

  refreshTableData() {
    this._contractorService.getContractors().subscribe((contractors: any) => {
      this.dataSource.data = contractors;
    });
  }*/

  refreshTableData() {
    this._employeeService.getEmployees().subscribe((employee: any) => {
      this.dataSource.data = employee;
    });
  }

  openCreateEmployeeModal() {
    const dialogRef = this.dialog.open(CreateEmployeeModalComponent);

    dialogRef.afterClosed().subscribe((formData: any) => {
      if (formData) {
        this._employeeService.createEmployee  (formData).subscribe((newEmployee: any) => {
          this.refreshTableData();
          this.cdr.detectChanges();
        });
      }
    });
  }


  openDeleteConfirmationDialog(employeeId: number) {
    const dialogRef = this.dialog.open(DeleteEmployeeDialogComponent, {
      data: { employeeId }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteEmployee(employeeId);
      }
    });
  }

  deleteEmployee(employeeId: number) {
    this._employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        this.snackBar.open('Employee deleted successfully', 'Close', {
          duration: 2000,
        });
        this.refreshTableData();
      },
      (error) => {
        console.error('Error deleting empliyee:', error);
        this.snackBar.open('Error deleting employee', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
