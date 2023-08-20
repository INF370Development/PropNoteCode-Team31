
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { SnaglistitemService } from 'src/app/services/snaglistitem.service';
  import { Snaglistitem } from 'src/app/shared/SnagListItem';
  
@Component({
  selector: 'app-create-snag-list-item',
  templateUrl: './create-snag-list-item.component.html',
  styleUrls: ['./create-snag-list-item.component.scss']
})
export class CreateSnagListItemComponent implements OnInit {
    adminRole: boolean = false;
    editorRole: boolean = false;
    viewerRole: boolean = false;
  
    snaglistitemModel: Snaglistitem = {
      snagListItemDescription: ''
    };
  
    constructor(
      private dialogRef: MatDialogRef<CreateSnagListItemComponent>,
      private snaglistitemService: SnaglistitemService,
      private router: Router
    ) {}
  
    ngOnInit(): void {}
    updateDescription(x:any)
    {
      this.snaglistitemModel.snagListItemDescription=x;
    }
    createRole() {
      this.dialogRef.close();
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  
    AddSnaglistitem() {
      debugger;
      this.snaglistitemService.createSnaglistitem(this.snaglistitemModel).subscribe(
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
  