import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-maintenance-modal',
  templateUrl: './assign-maintenance-modal.component.html',
  styleUrls: ['./assign-maintenance-modal.component.scss']
})
export class AssignMaintenanceModalComponent implements OnInit {

  @Output() formDataSubmitted = new EventEmitter<any>();

  assignMaintenanceForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AssignMaintenanceModalComponent>,
    private fb: FormBuilder
    ) {
    this.assignMaintenanceForm = this.fb.group({
      maintenanceNote: ['', [Validators.required]],
      status: ['', [Validators.required]],
      property: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.assignMaintenanceForm = this.fb.group({
      maintenanceNote: ['', [Validators.required]],
      status: ['', [Validators.required]],
      property: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.assignMaintenanceForm.valid) {
      const formData = this.assignMaintenanceForm.value;
      this.dialogRef.close(formData); 
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}