import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { MaintenanceStatus } from 'src/app/shared/MaintenanceStatus';
  
  @Component({
    selector: 'app-add-maintenance-status',
    templateUrl: './add-maintenance-status.component.html',
    styleUrls: ['./add-maintenance-status.component.scss']
  })
  export class AddMaintenanceStatusComponent  implements OnInit {
    nameFormControl = new FormControl('', [
      Validators.required,
    ]);
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
  
    MaintenanceStatusModal: MaintenanceStatus = {
      maintenanceStatusID:0,
      maintenanceStatusName: '',
    };
  
    constructor(
      private dialogRef: MatDialogRef<AddMaintenanceStatusComponent>,
      private maintenanceService: MaintenanceService,
      private router: Router
    ) {}
  
    ngOnInit(): void {}
    updateName(x:any)
    {
      this.MaintenanceStatusModal.maintenanceStatusName=x;
    }
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    AddMaintenanceType() {
      //debugger;
      if(this.MaintenanceStatusModal.maintenanceStatusName!=''){
      this.maintenanceService.AddMaintenanceStatus(this.MaintenanceStatusModal).subscribe(
        (response) => {
          console.log('Snaglistitem created successfully:', response);
          // You can optionally close the modal after creating the snaglistitem
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          console.error('Error creating snaglistitem:', error);
        }
      );}
    }
  }
  

