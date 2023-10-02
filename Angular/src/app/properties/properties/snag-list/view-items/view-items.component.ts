import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { SnagListService } from 'src/app/services/snaglist.service';
import { EditItemsComponent } from '../edit-snag-list/edit-items/edit-items.component';
import { EditViewComponent } from './edit-view/edit-view.component';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent {
  List:any;
  constructor(
    private dialogRef: MatDialogRef<ViewItemsComponent>,
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
  }
  EditList()
  {
    const dialogRef = this.dialog.open(EditViewComponent, {});
  }
  closeModal() {
    this.dialogRef.close();
  }

  DeleteAllItems() {
    debugger;
   this._SnagListService.deleteAllitemsinList(this._SnagListService.ListId).subscribe();
   this._SnagListService.deleteSnagList(this._SnagListService.ListId).subscribe();
  }
}
