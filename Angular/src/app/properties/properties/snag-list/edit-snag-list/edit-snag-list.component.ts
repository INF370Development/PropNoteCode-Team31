import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
  import { SnagListService } from 'src/app/services/snaglist.service';
  import { SnagList } from 'src/app/shared/SnagList';
import { EditItemsComponent } from './edit-items/edit-items.component';

@Component({
  selector: 'app-edit-snag-list',
  templateUrl: './edit-snag-list.component.html',
  styleUrls: ['./edit-snag-list.component.scss']
})
export class EditSnagListComponent implements OnInit{
  descriptionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/), // Accepts only alphabets and spaces
    Validators.maxLength(50), // Maximum length is 32 characters
  ]);
  PropertyFormControl= new FormControl('', [
    Validators.required,
  ]);
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;
  Property:any;
  ItemModal: SnagList = {
    propertyId:0,
    snagListDescription: ''
  };
snaglist:any;
  constructor(
    private dialogRef: MatDialogRef<EditSnagListComponent>,
    private _SnagListService: SnagListService,
    private property_service: PropertiesService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void 
  {
    this._SnagListService.getSnagList(this._SnagListService.LiistID).subscribe((Maintenance: any) => {
      this.snaglist=Maintenance;
    });
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

  EditItem() {
    debugger;
    this._SnagListService.editSnagList(this._SnagListService.LiistID,this.ItemModal).subscribe(
      (response) => {
        console.log('Snaglist edited successfully:', response);
        // You can optionally close the modal after creating the snaglistitem
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error editing snaglist:', error);
      }
    );
    const dialogRef = this.dialog.open(EditItemsComponent, {});
  }
}
