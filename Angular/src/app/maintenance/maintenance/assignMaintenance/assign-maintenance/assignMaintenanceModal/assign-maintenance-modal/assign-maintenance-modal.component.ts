import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Property } from 'src/app/shared/Property/Property';
import { Maintenance } from 'src/app/shared/Maintenance';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Router } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/shared/UserModels/Contractor';

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

  //assignMaintenance: AssignMaintenance[] =[] ;

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

  //Maintenance Note
  maintenanceNote = new FormControl('', [Validators.required]);

  getErrorMessageMaintenanceNote() {
    if (this.maintenanceNote.hasError('required')) {
      return 'Maintenance note required';
    }

    return this.maintenanceNote.hasError('maintenanceNote') ? 'Not a valid maintenance note' : '';
  }
  //Status
  status = new FormControl('', [Validators.required]);

  getErrorMessageAvailability() {
    if (this.status.hasError('required')) {
      return 'Status required';
    }

    return this.status.hasError('status') ? 'Not a valid status' : '';
  }
}