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
import { PropertiesService } from 'src/app/services/properties.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { MaintenanceNote } from 'src/app/shared/MaintenanceNote';

  @Component({
    selector: 'app-edit-maintenance',
    templateUrl: './edit-maintenance.component.html',
    styleUrls: ['./edit-maintenance.component.scss']
  })
  export class EditMaintenanceComponent    /*implements OnInit*/ {
   /* Property:any;
    Contractor:any;
    Status:any;
    Type:any;
    Maintenance:any;
    MainForm: FormGroup;
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
    time: string[]=['12:30','11:30','10:30','09:30','08:30'];
    MaintenanceModal: Maintenance = {
      maintenanceID: 0,
      propertyID: 0,
      contractorID: 0,
      maintenanceStatusID: 0,
      maintenanceTypeID: 0,
      maintenanceDate: new Date(),
      maintenanceTime: "23:00",
      property: new Property,
      contractor: new Contractor,
      maintenanceStatus: new MaintenanceStatus,
      maintenanceType: new MaintenanceType,
      maintenanceNote: new MaintenanceNote
    };
    formBuilder: any;
  
    constructor(
      private dialogRef: MatDialogRef<EditMaintenanceComponent>,
      private maintenanceService: MaintenanceService,
      private property_service: PropertiesService,
      private contractor_service: ContractorService,
      private router: Router
    ) {this.MainForm = new FormGroup({});}
  
    ngOnInit(): void {
      this.maintenanceService.getMaintenance(this.maintenanceService.MaintenanceId).subscribe((Maintenance: any) => {
        this.Maintenance=Maintenance;
      });
      this.maintenanceService.getMaintenanceStatuses().subscribe((Maintenance: any) => {
        this.Status=Maintenance;
      });
      this.maintenanceService.getMaintenanceTypes().subscribe((Maintenance: any) => {
        this.Type=Maintenance;
      });
      this.property_service.getProperties().subscribe((Maintenance: any) => {
        this.Property=Maintenance;
      });
      this.contractor_service.getContractors().subscribe((Maintenance: any) => {
        this.Contractor=Maintenance;
      });

      this.MainForm = this.formBuilder.group({
        PropertyId: ['', Validators.required],
        ContractorId: ['',Validators.required],
        StatusId: ['', Validators.required],
        TypeId: ['', Validators.required],
        endDate: ['', Validators.required],
        Time: ['', Validators.required],
      });
    
    }
    updatePropertyId(x: any) {
      this.MaintenanceModal.propertyID = x;
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
    
    updateMaintenanceTime(x: any) {
      this.MaintenanceModal.maintenanceTime = x;
    }
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    EditMaintenance(x:any) {
      debugger;
      this.MaintenanceModal.maintenanceDate=x;
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
    }*/
  }
  


