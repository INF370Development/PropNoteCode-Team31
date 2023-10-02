import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { MaintenanceNote } from 'src/app/shared/MaintenanceNote';
  
  @Component({
    selector: 'app-edit-maintenance-note',
    templateUrl: './edit-maintenance-note.component.html',
    styleUrls: ['./edit-maintenance-note.component.scss']
  })
  export class EditMaintenanceNoteComponent  implements OnInit {
    descriptionFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
      Validators.maxLength(50), // Maximum length is 32 characters
    ]);
    note:any;
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
  
    MaintenanceNoteModal: MaintenanceNote = {
      maintenanceID: 0,
      maintenanceNoteDescription: ''
    };
  
    constructor(
      private dialogRef: MatDialogRef<EditMaintenanceNoteComponent>,
      private maintenanceService: MaintenanceService,
      private router: Router
    ) {}
  
    ngOnInit(): void {}
    updateDescription(x:any)
    {
      this.MaintenanceNoteModal.maintenanceNoteDescription=x;
    }
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    EditMaintenanceNote() {
      debugger;
      this.MaintenanceNoteModal.maintenanceID=this.maintenanceService.MaintenanceId;
      this.maintenanceService.EditMaintenanceNote(this.maintenanceService.MaintenanceId,this.MaintenanceNoteModal).subscribe(
        (response) => {
          console.log('MaintenanceNote created successfully:', response);
          // You can optionally close the modal after creating the snaglistitem
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          console.error('Error creating MaintenanceNote:', error);
        }
      );
    }
  }
  



