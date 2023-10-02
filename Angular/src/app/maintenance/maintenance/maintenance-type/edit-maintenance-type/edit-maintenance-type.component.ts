import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { MaintenanceType } from 'src/app/shared/MaintenanceType';

@Component({
  selector: 'app-edit-maintenance-type',
  templateUrl: './edit-maintenance-type.component.html',
  styleUrls: ['./edit-maintenance-type.component.scss']
})
export class EditMaintenanceTypeComponent  implements OnInit {
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
    private dialogRef: MatDialogRef<EditMaintenanceTypeComponent>,
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

  // EditMaintenanceType() {
  //   debugger;
  //   this.maintenanceService.EditMaintenancetype(this.maintenanceService.type,this.MaintenanceTypeModal).subscribe(
  //     (response) => {
  //       console.log('Snaglistitem created successfully:', response);
  //       // You can optionally close the modal after creating the snaglistitem
  //       this.dialogRef.close();
  //       location.reload();
  //     },
  //     (error) => {
  //       console.error('Error creating snaglistitem:', error);
  //     }
  //   );
  // }
}


