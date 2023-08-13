import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface  Employee {
  id : number;
  email: string;
  name: string;
  surname: string;
  phone: string;
  jobTitle: string;
}


@Component({
  selector: 'app-update-employee-modal',
  templateUrl: './update-employee-modal.component.html',
  styleUrls: ['./update-employee-modal.component.scss']
})
export class UpdateEmployeeModalComponent {

  email: string = '';
  name: string = '';
  surname: string = '';
  phone: string = '';
  jobTitle: string = '';

  @Output() employeeUpdated: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private dialogRef: MatDialogRef<UpdateEmployeeModalComponent>
  ) {
    this.email = data.email;
    this.name = data.name;
    this.surname = data.surname;
    this.phone = data.phone;
    this.jobTitle = data.jobTitle;
  }

  closeModal() {
    this.dialogRef.close(); 
  }

  updateEmployee() {
    const employeeUpdated: Employee = {
      id: this.data.id,
      email: this.data.email,
      name: this.data.name,
      surname : this.data. surname,
      phone : this.data.phone,
      jobTitle : this.data.jobTitle
    };
    this.employeeUpdated.emit(employeeUpdated);
    this.dialogRef.close();
  }
}
