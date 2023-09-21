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

  @Component({
    selector: 'app-edit-maintenance',
    templateUrl: './edit-maintenance.component.html',
    styleUrls: ['./edit-maintenance.component.scss']
  })
  export class EditMaintenanceComponent    implements OnInit {
    Property:any;
    Contractor:any;
    Status:any;
    Type:any;
    MainForm: FormGroup;
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
    time: string[]=['10:30','9:30','08:30'];
    
    formBuilder: any;
  
    constructor(
      private dialogRef: MatDialogRef<EditMaintenanceComponent>,
      private maintenanceService: MaintenanceService,
      private property_service: PropertiesService,
      private contractor_service: ContractorService,
      private router: Router
    ) {this.MainForm = new FormGroup({});}
  
    ngOnInit(): void {
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
        ContractorId: ['', ],
        StatusId: ['', Validators.required],
        TypeId: ['', Validators.required],
        endDate: ['', Validators.required],
        Time: ['', Validators.required],
      });
    
    }
    
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    AddMaintenanceType() {
      debugger;
      let MaintenanceModal: Maintenance = {
        propertyID: this.MainForm.value.PropertyId,
        contractorID: this.MainForm.value.ContractorId,
        maintenanceStatusID: this.MainForm.value.StatusId,
        maintenanceTypeID: this.MainForm.value.TypeId,
        maintenanceDate: this.MainForm.value.endDate,
        maintenanceTime: "23:00",
        property: new Property,
        contractor: new Contractor,
        maintenanceStatus: new MaintenanceStatus,
        maintenanceType: new MaintenanceType
      };
      this.maintenanceService.EditMaintenance(this.maintenanceService.MaintenanceId,MaintenanceModal).subscribe(
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
  


