import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-tenant-modal',
  templateUrl: './create-tenant-modal.component.html',
  styleUrls: ['./create-tenant-modal.component.scss']
})

export class CreateTenantModalComponent implements OnInit {
  
  @Output() formDataSubmitted = new EventEmitter<any>();

  tenantForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTenantModalComponent>,
    private fb: FormBuilder
    ) {
    this.tenantForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.tenantForm.valid) {
      const formData = this.tenantForm.value;
      this.dialogRef.close(formData); 
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
