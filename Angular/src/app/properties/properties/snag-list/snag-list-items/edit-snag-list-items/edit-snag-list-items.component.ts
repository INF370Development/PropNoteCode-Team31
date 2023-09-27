import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnagListService } from 'src/app/services/snaglist.service';
import { Snaglistitem } from 'src/app/shared/SnagListItem';
@Component({
  selector: 'app-edit-snag-list-items',
  templateUrl: './edit-snag-list-items.component.html',
  styleUrls: ['./edit-snag-list-items.component.scss']
})
export class EditSnagListItemsComponent implements OnInit{
  descriptionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
    Validators.maxLength(50), // Maximum length is 32 characters
  ]);
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;
  Item:any;
  ItemModal: Snaglistitem = {
    snagListItemDescription: ''
  };

  constructor(
    private dialogRef: MatDialogRef<EditSnagListItemsComponent>,
    private _SnagListService: SnagListService,
    private router: Router
  ) {}

  ngOnInit() 
  {
    this._SnagListService.getSnaglistitem(this._SnagListService.ItemID).subscribe((Items: any) => {
      this.Item = Items;
    });
  }
  updateDescription(x:any)
  {
    this.ItemModal.snagListItemDescription=x;
  }
  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  EditItem() {
    debugger;
    this._SnagListService.editSnaglistitem(this._SnagListService.ItemID,this.ItemModal).subscribe(
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
