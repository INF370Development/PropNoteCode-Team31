import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { Maintenance } from 'src/app/shared/Maintenace';
  import { Time } from "@angular/common";
  import { Property } from 'src/app/shared/Property/Property';
  import { MaintenanceStatus } from 'src/app/shared/MaintenanceStatus';
  import { MaintenanceType } from 'src/app/shared/MaintenanceType';
  import { Contractor } from 'src/app/shared/UserModels/Contractor';

  @Component({
    selector: 'app-add-maintenance',
    templateUrl: './add-maintenance.component.html',
    styleUrls: ['./add-maintenance.component.scss']
  })
  export class AddMaintenanceComponent   implements OnInit {
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
    time: Time={hours:12,minutes:30};
    
    MaintenanceModal: Maintenance = {
        propertyID: 0,
        contractorID: 0,
        maintenanceStatusID: 0,
        maintenanceTypeID: 0,
        maintenanceDate: new Date(),
        maintenanceTime: new Date,
        property: new Property,
        contractor: new Contractor,
        maintenanceStatus: new MaintenanceStatus,
        maintenanceType: new MaintenanceType
      };
  
    constructor(
      private dialogRef: MatDialogRef<AddMaintenanceComponent>,
      private maintenanceService: MaintenanceService,
      private router: Router
    ) {}
  
    ngOnInit(): void {}
    updatePropertyId(x: any) {
      this.MaintenanceModal.propertyID = x;
    }
    
    updateEmployeeId(x: any) {
      //this.MaintenanceModal.employeeID = x;
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
    updateDate(picker:any)
    {
      this.MaintenanceModal.maintenanceDate=picker;
    }
    AddMaintenanceType() {
      debugger;
      this.maintenanceService.AddMaintenance(this.MaintenanceModal).subscribe(
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
  


