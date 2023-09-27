import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { SnagListService } from 'src/app/services/snaglist.service';
import { EditSnagListComponent } from '../edit-snag-list.component';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss']
})
export class EditItemsComponent {
  Items:any; 
  List:any;
  constructor(
    private dialogRef: MatDialogRef<EditItemsComponent>,
    private _SnagListService: SnagListService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void 
  {
    this._SnagListService.getSnaglistitemsIn(this._SnagListService.LiistID).subscribe((Items: any) => {
      this.List=Items;
    }); 
    
    this._SnagListService.getSnaglistitemsNot(this._SnagListService.LiistID).subscribe((Items: any) => {
      this.Items=Items;
    });
  }
  handleCheckboxChange(event: any,i:any) {
    if (event.target.checked) {
      this.AddItemToList(i);
    } else {
      this.DeleteItemToList(i);
    }
  }
  AddItemToList(i: number) {
    this._SnagListService.addItemtoList(this._SnagListService.LiistID,i).subscribe(
      (response) => {
        console.log('Snaglistitem added successfully:', response);
      },
      (error) => {
        console.error('Error adding snaglistitem:', error);
      });
  }
  
  DeleteItemToList(i: number) {
    this._SnagListService.deleteItemsFromList(this._SnagListService.LiistID,i).subscribe(
      (response) => {
        console.log('Snaglistitem removed successfully:', response);
      },
      (error) => {
        console.error('Error removing snaglistitem:', error);
      });
  }
  closeModal() {
    this.dialogRef.close();
        location.reload();
  }

  DeleteAllItems() {
    debugger;
   this._SnagListService.deleteAllitemsinList(this._SnagListService.ListId).subscribe();
   this._SnagListService.deleteSnagList(this._SnagListService.ListId).subscribe();
  }
}
