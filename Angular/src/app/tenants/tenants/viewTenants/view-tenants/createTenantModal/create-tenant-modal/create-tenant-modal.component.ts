import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tenant-modal',
  templateUrl: './create-tenant-modal.component.html',
  styleUrls: ['./create-tenant-modal.component.scss']
})
export class CreateTenantModalComponent implements OnInit {

  tenantForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // Add more form controls for other tenant information
    });
  }

  onSubmit() {
    if (this.tenantForm.valid) {
      // Add logic here to create a new tenant using this.tenantForm.value
      // Call your service to send the data to the server
      // Close the dialog when the tenant is successfully created
    }
  }
}
