import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnagListService } from 'src/app/services/snaglist.service';

@Component({
  selector: 'app-delete-snag-list-item',
  templateUrl: './delete-snag-list-item.component.html',
  styleUrls: ['./delete-snag-list-item.component.scss']
})
export class DeleteSnagListItemComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSnagListItemComponent>,
    private http: HttpClient,
    private _SnagListService: SnagListService,
    private snackBar: MatSnackBar,
    
  ) { }
  closeModal() {
    this.dialogRef.close();
  }
  async deleteSnagList() {
    await this._SnagListService.deleteSnaglistitem(this._SnagListService.ItemID).subscribe();
    this.showSnackBar();
  }
  showSnackBar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
      'Deleted successfully',
      'X',
      { duration: 500 }
    );
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
  }
}
