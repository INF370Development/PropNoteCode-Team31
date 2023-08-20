import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { Maintenance } from 'src/app/shared/Maintenace';
  import { Time } from "@angular/common";

  @Component({
    selector: 'app-edit-maintenance',
    templateUrl: './edit-maintenance.component.html',
    styleUrls: ['./edit-maintenance.component.scss']
  })
  export class EditMaintenanceComponent    implements OnInit {
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
    time: Time={hours:12,minutes:30};
    MaintenanceModal: Maintenance = {
        propertyID: 0,
        employeeID: 0,
        contractorID: 0,
        maintenanceStatusID: 0,
        maintenanceTypeID: 0,
        maintenanceDate: new Date(),
        maintenanceTime: new Date(),
      };
  
    constructor(
      private dialogRef: MatDialogRef<EditMaintenanceComponent>,
      private maintenanceService: MaintenanceService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.maintenanceService.getMaintenance(this.maintenanceService.MaintenanceId,this.MaintenanceModal);
    }
    updatePropertyId(x: any) {
      this.MaintenanceModal.propertyID = x;
    }
    
    updateEmployeeId(x: any) {
      this.MaintenanceModal.employeeID = x;
    }
    
    updateContractorId(x: any) {
      this.MaintenanceModal.contractorID = x;
    }
    
    updateMaintenanceStatusId(x: any) {
      this.MaintenanceModal.maintenanceStatusID = x;
    }
    
    updateMaintenanceTypeId(x: any) {
      this.MaintenanceModal.maintenanceTypeID = x;
    }
    
    updateMaintenanceDate(x: any) {
      this.MaintenanceModal.maintenanceDate = x;
    }
    
    updateMaintenanceTime(x: any) {
      this.MaintenanceModal.maintenanceTime = x;
    }
    
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    AddMaintenanceType() {
      debugger;
      this.maintenanceService.EditMaintenance(this.maintenanceService.MaintenanceId,this.MaintenanceModal).subscribe(
        (response) => {
          console.log('Snaglistitem created successfully:', response);
          // You can optionally close the modal after creating the snaglistitem
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          console.error('Error creating snaglistitem:', error);
        }
      );
    }
  }
  


