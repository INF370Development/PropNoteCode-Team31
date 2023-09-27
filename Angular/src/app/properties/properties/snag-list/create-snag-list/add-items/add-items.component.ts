import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { SnagListService } from 'src/app/services/snaglist.service';
import { CreateSnagListComponent } from '../create-snag-list.component';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent {
  Items:any; 
  x:any;
  constructor(
    private dialogRef: MatDialogRef<AddItemsComponent>,
    private _SnagListService: SnagListService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void 
  {
      
    this._SnagListService.getLast().subscribe((id: any) => {
      this._SnagListService.ListId=id;
      this.x=id;
    });
    this.update();
    this._SnagListService.getSnaglistitems().subscribe((Items: any) => {
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
  update()
  {
    this.x=this._SnagListService.ListId;
  }
  AddItemToList(i: number) {
    this._SnagListService.addItemtoList(this._SnagListService.ListId,i).subscribe(
      (response) => {
        console.log('Snaglistitem added successfully:', response);
      },
      (error) => {
        console.error('Error adding snaglistitem:', error);
      });
  }
  
  DeleteItemToList(i: number) {
    this._SnagListService.deleteItemsFromList(this._SnagListService.ListId,i).subscribe(
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
   this.closeModal();
  }
}
