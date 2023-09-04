import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { MaintenanceStatus } from 'src/app/shared/MaintenanceStatus';
  
  @Component({
    selector: 'app-edit-maintenance-status',
    templateUrl: './edit-maintenance-status.component.html',
    styleUrls: ['./edit-maintenance-status.component.scss']
  })
  export class EditMaintenanceStatusComponent  implements OnInit {
    nameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
      Validators.maxLength(32), // Maximum length is 32 characters
    ]);
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
  
    MaintenanceStatusModal: MaintenanceStatus = {
      maintenanceStatusName: '',
    };
  
    constructor(
      private dialogRef: MatDialogRef<EditMaintenanceStatusComponent>,
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
  
    EditMaintenanceStatus() {
      //debugger;
      this.maintenanceService.EditMaintenanceStatus(this.maintenanceService.status,this.MaintenanceStatusModal).subscribe(
        (response) => {
          console.log('MaintenanceStatus created successfully:', response);
          // You can optionally close the modal after creating the snaglistitem
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          console.error('Error creating MaintenanceStatus:', error);
        }
      );
    }
  }
  


