  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { MaintenanceType } from 'src/app/shared/MaintenanceType';

  @Component({
    selector: 'app-add-maintenance-type',
    templateUrl: './add-maintenance-type.component.html',
    styleUrls: ['./add-maintenance-type.component.scss']
  })
  export class AddMaintenanceTypeComponent  implements OnInit {
    nameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
      Validators.maxLength(32), // Maximum length is 32 characters
    ]);
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;

    // MaintenanceTypeModal: MaintenanceType = {
    //   maintenanceTypeName: '',
    // };

    constructor(
      private dialogRef: MatDialogRef<AddMaintenanceTypeComponent>,
      private maintenanceService: MaintenanceService,
      private router: Router
    ) {}

    ngOnInit(): void {}
    // updateName(x:any)
    // {
    //   this.MaintenanceTypeModal.maintenanceTypeName=x;
    // }
    createRole() {
      this.dialogRef.close();
    }

    closeModal() {
      this.dialogRef.close();
    }

    // AddMaintenanceType() {
    //   //debugger;
    //   if(this.MaintenanceTypeModal.maintenanceTypeName!=''){
    //   this.maintenanceService.AddMaintenanceType(this.MaintenanceTypeModal).subscribe(
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


