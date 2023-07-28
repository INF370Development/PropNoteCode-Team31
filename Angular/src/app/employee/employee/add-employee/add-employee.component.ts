import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../services/employee-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  empForm = new FormGroup (
    {
      name: new FormControl(''),
      surname: new FormControl(''),
      phonenumber: new FormControl(''),
      email: new FormControl('')
    }
   )

    constructor(private dataService: EmployeeServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['./view-employee'])
  }

  onSubmit(){
    // this.dataService.addEmployee(this.empForm.value).subscribe(result => {
    //       this.router.navigate(['/view-employee'])
    }
  }


