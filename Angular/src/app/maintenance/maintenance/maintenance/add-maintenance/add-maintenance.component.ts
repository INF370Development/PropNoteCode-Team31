import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { PropertiesService } from 'src/app/services/properties.service';
  import { ContractorService } from 'src/app/services/contractor.service';
  import { Maintenance } from 'src/app/shared/Maintenance';
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

    Property:any;
    Contractor:any;
    Status:any;
    Type:any;
    time: string[]=['12:30','11:30','10:30','09:30','08:30'];

    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;

    // MaintenanceModal: Maintenance = {
    //     propertyID: 0,
    //     contractorID: 0,
    //     maintenanceTypeID: 0,
    //     maintenanceDate: "",
    //     maintenanceTime: "12:30",
    //     property: new Property,
    //     contractor: new Contractor,
    //     maintenanceStatus: new MaintenanceStatus,
    //     maintenanceType: new MaintenanceType
    //   };
    //   prpertyFormControl = new FormControl('', [
    //     Validators.required
    //   ]);
    //   contractorFormControl = new FormControl('', [
    //     Validators.required
    //   ]);
    //   statusFormControl = new FormControl('', [
    //     Validators.required
    //   ]);
    //   typeFormControl = new FormControl('', [
    //     Validators.required
    //   ]);
    //   dateFormControl = new FormControl('', [
    //     Validators.required
    //   ]);
    //   timeFormControl = new FormControl('', [
    //     Validators.required
    //   ]);

    constructor(
      private dialogRef: MatDialogRef<AddMaintenanceComponent>,
      private maintenanceService: MaintenanceService,
      private property_service: PropertiesService,
      private contractor_service: ContractorService,
      private router: Router
    ) {}
    dat:string='a';
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
    }
    // updatePropertyId(x: any) {
    //   this.MaintenanceModal.propertyID = x;
    // }

    // updateContractorId(x: any) {
    //   this.MaintenanceModal.contractorID = x;
    // }

    // updateMaintenanceStatusId(x: any) {
    //   this.MaintenanceModal.maintenanceStatusID = x;
    // }

    // updateMaintenanceTypeId(x: any) {
    //   this.MaintenanceModal.maintenanceTypeID = x;
    // }

    // updateMaintenanceDate(x: any) {
    //   this.MaintenanceModal.maintenanceDate = x;
    //   this.dat=x;
    // }

    // updateMaintenanceTime(x: any) {
    //   this.MaintenanceModal.maintenanceTime = x;
    // }

    // createRole() {
    //   this.dialogRef.close();
    // }

    // closeModal() {
    //   this.dialogRef.close();
    // }
    // AddMaintenanceType(x:any) {
    //   //debugger;
    //   if(this.MaintenanceModal.propertyID!=0&&
    //     this.MaintenanceModal.contractorID!= 0&&
    //     this.MaintenanceModal.maintenanceStatusID!= 0&&
    //     this.MaintenanceModal.maintenanceTypeID!= 0&&
    //     this.MaintenanceModal.maintenanceDate!= ""&&
    //     this.MaintenanceModal.maintenanceTime!= "12:30"){
    //   this.MaintenanceModal.maintenanceDate=x;
    //   this.maintenanceService.AddMaintenance(this.MaintenanceModal).subscribe(
    //     (response) => {
    //       console.log('Snaglistitem created successfully:', response);
    //       // You can optionally close the modal after creating the snaglistitem
    //       this.dialogRef.close();
    //       location.reload();
    //     },
    //     (error) => {
    //       console.error('Error creating snaglistitem:', error);
    //     }
    //   );}
    // }
  }



