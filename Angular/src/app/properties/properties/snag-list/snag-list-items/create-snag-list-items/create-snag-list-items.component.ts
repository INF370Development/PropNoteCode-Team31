import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { SnagListService } from 'src/app/services/snaglist.service';
  import { Snaglistitem } from 'src/app/shared/SnagListItem';
  

@Component({
  selector: 'app-create-snag-list-items',
  templateUrl: './create-snag-list-items.component.html',
  styleUrls: ['./create-snag-list-items.component.scss']
})
export class CreateSnagListItemsComponent implements OnInit{

  descriptionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
    Validators.maxLength(50), // Maximum length is 32 characters
  ]);
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  ItemModal: Snaglistitem = {
    snagListItemDescription: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CreateSnagListItemsComponent>,
    private _SnagListService: SnagListService,
    private router: Router
  ) {}

  ngOnInit(): void {}
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

  CreateItem() {
    debugger;
    this._SnagListService.createSnaglistitem(this.ItemModal).subscribe(
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
