import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
  import { SnagListService } from 'src/app/services/snaglist.service';
  import { SnagList } from 'src/app/shared/SnagList';
  import { AddItemsComponent } from './add-items/add-items.component';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-create-snag-list',
  templateUrl: './create-snag-list.component.html',
  styleUrls: ['./create-snag-list.component.scss']
})
export class CreateSnagListComponent implements OnInit {
  descriptionFormControl = new FormControl('', [
    /*Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
    Validators.maxLength(50), // Maximum length is 32 characters*/
  ]);
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;
  Property:any;
  ItemModal: SnagList = {
    propertyId:0,
    snagListDescription: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CreateSnagListComponent>,
    private _SnagListService: SnagListService,
    private property_service: PropertiesService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void 
  {
    
    this.property_service.getProperties().subscribe((Maintenance: any) => {
      this.Property=Maintenance;
    });
  }
  updateDescription(x:any)
  {
    this.ItemModal.snagListDescription=x;
  }
  updateProperty(x:any)
  {
    this.ItemModal.propertyId=x;
  }
  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  async CreateItem() {
    debugger;
      this._SnagListService
    await this._SnagListService.createSnagList(this.ItemModal).subscribe(
      (response) => {
        console.log('Snaglistitem created successfully:', response);
      },
      (error) => {
        console.error('Error creating snaglistitem:', error);
      },
    );
    this._SnagListService.getLast().subscribe((id: any) => {
      this._SnagListService.ListId=id;
    });
    this.closeModal();
    const dialogRef = this.dialog.open(AddItemsComponent, {});
  }
}
