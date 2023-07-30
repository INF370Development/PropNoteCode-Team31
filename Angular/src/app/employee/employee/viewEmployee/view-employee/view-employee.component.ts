import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DeleteEmployeeDialogComponent } from './deleteEmployeeDialog/delete-employee-dialog/delete-employee-dialog.component';
import { UpdateEmployeeModalComponent } from './updateEmployeeModal/update-employee-modal/update-employee-modal.component';

NgModule({
  imports: [MatDialogModule, FormsModule, MatInputModule, MatButtonModule],
});

export interface DialogData {
  id: number;
  email: string;
  name: string;
  surname: string;
  phone: string;
  jobTitle: string;
}

interface Employee {
  id: number;
  email: string;
  name: string;
  surname: string;
  phone: string;
  jobTitle: string;
}

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
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent {
  employee: Employee[] = [
    {
      id: 1,
      email: 'johndoe@propco.co.za',
      name: 'John',
      surname: 'Doe',
      phone: '0798903590',
      jobTitle: 'Administator',
    },
    {
      id: 2,
      email: 'brandon@propco.co.za',
      name: 'Brandon',
      surname: 'Driver',
      phone: '0834477955',
      jobTitle: 'Asset Manager',
    },
    {
      id: 3,
      email: 'myles@propco.co.za',
      name: 'Myles',
      surname: 'Brown',
      phone: '0824479855',
      jobTitle: 'Financial Manager',
    },
  ];

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ViewEmployeeComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  //Delete Dialog
  openDeleteEmployeeDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeDialogComponent, {
      width: '300px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.employee = this.employee.filter((u) => u.id !== employee.id);
        this.filtered = this.filtered.filter((u) => u.id !== employee.id);
      }
    });
  }

  //Update Modal
  openUpdateEmployeeModal(employee: Employee): void {
    const dialogRef = this.dialog.open(UpdateEmployeeModalComponent, {
      data: employee,
    });

    dialogRef.componentInstance.employeeUpdated.subscribe(
      (updatedEmployee: Employee) => {
        const index = this.employee.findIndex(
          (u) => u.id === updatedEmployee.id
        );
        if (index !== -1) {
          this.employee[index] = updatedEmployee;
          this.filtered = this.employee.filter((u) =>
            u.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      }
    );
  }

  //Search
  searchTerm: string = '';
  filtered: Employee[] = [];

  constructor(public dialog: MatDialog) {
    this.filtered = this.employee;
  }

  search() {
    this.filtered = this.employee.filter((u) => {
      const searchLower = this.searchTerm.toLowerCase();
      const employeeNameLower = u.name.toLowerCase(); // Use 'roleName', not 'role'
      return employeeNameLower.includes(searchLower);
    });
  }
}
