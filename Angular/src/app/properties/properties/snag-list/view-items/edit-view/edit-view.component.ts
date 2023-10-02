import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnagListService } from 'src/app/services/snaglist.service';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent {
  Items:any; 
  List:any;
  constructor(
    private dialogRef: MatDialogRef<EditViewComponent>,
    private _SnagListService: SnagListService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
a:any;
  ngOnInit(): void 
  {
    this._SnagListService.getSnaglistitemsIn(this._SnagListService.LiistID).subscribe((Items: any) => {
      this.List=Items;
    }); 
    
    this._SnagListService.getSnaglistitemsNot(this._SnagListService.LiistID).subscribe((Items: any) => {
      this.Items=Items;
    });
    this.a=this._SnagListService.LiistID;
  }
  handleCheckboxChange(event: any,i:any) {
    if (event.target.checked) {
      this.AddItemToList(i);
    } 
    else {
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
}
