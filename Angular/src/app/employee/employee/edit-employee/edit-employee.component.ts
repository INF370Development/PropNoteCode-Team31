import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../services/employee-service.service';
import { Employee } from 'src/app/shared/employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit{
 empForm = new FormGroup (
  {
    name: new FormControl(''),
    surname: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  }
 )

 employee:any

 constructor(private dataService: EmployeeServiceService,private router: Router, private route:ActivatedRoute) { }
 
 ngOnInit(): void {
  this.dataService.getEmployee(+this.route.snapshot.params['id']).subscribe(result => {
    this.employee = result
    this.empForm.patchValue({
      name: this.employee.name,
      surname: this.employee.surname,
      phonenumber: this.employee.phonenumber,
      email: this.employee.email
    });
})
}

cancel(){
  this.router.navigate(['/employees'])
}

onSubmit(){
  // if(this.empForm.valid){
  // this.dataService.editEmployee(this.employee.EmployeeID, this.empForm.value).subscribe(result => {
  //       this.router.navigate(['/employees']);
  
  }
}


