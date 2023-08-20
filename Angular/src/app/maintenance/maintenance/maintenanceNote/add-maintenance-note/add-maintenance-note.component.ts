import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { MaintenanceNote } from 'src/app/shared/MaintenanceNote';
  
  @Component({
    selector: 'app-add-maintenance-note',
    templateUrl: './add-maintenance-note.component.html',
    styleUrls: ['./add-maintenance-note.component.scss']
  })
  export class AddMaintenanceNoteComponent  implements OnInit {
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
  
    MaintenanceNoteModal: MaintenanceNote = {
      maintenaceID: 0,
      maintenaceNoteDescription: ''
    };
  
    constructor(
      private dialogRef: MatDialogRef<AddMaintenanceNoteComponent>,
      private maintenanceService: MaintenanceService,
      private router: Router
    ) {}
  
    ngOnInit(): void {}
    updateDescription(x:any)
    {
      this.MaintenanceNoteModal.maintenaceNoteDescription=x;
    }
    updateId(x:any)
    {
      this.MaintenanceNoteModal.maintenaceID=x;
    }
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    AddMaintenanceType() {
      debugger;
      this.maintenanceService.AddMaintenanceNote(this.MaintenanceNoteModal).subscribe(
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
  


