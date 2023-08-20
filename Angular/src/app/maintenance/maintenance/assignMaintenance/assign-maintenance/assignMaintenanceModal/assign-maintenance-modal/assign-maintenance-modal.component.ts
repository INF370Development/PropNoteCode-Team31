import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Property } from 'src/app/shared/Property/Property';
import { Contractor } from 'src/app/shared/Contractor';
import { Maintenance } from 'src/app/shared/Maintenance';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Router } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-assign-maintenance-modal',
  templateUrl: './assign-maintenance-modal.component.html',
  styleUrls: ['./assign-maintenance-modal.component.scss']
})
export class AssignMaintenanceModalComponent implements OnInit {

  @Output() formDataSubmitted = new EventEmitter<any>();

  assignMaintenanceForm!: FormGroup;

  maintenanceModal: Maintenance = {
    id: 0,
    maintenanceNote: '',
    status: "",
    propertyID: 0,
    property: new Property(),
    contractorID: 0,
    contractor: new Contractor(),
  };

properties: Property[] = [];
contractors: Contractor[] = [];

  constructor(
    private dialogRef: MatDialogRef<AssignMaintenanceModalComponent>,
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private contractorService: ContractorService,
    //PROPERTY SERVICE?
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

    this.contractorService.getContractors().subscribe((contractor) => {
        this.contractors = contractor;
    });
    
    //PROPERTY?
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