import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnagListService } from 'src/app/services/snaglist.service';

@Component({
  selector: 'app-delete-snag-list',
  templateUrl: './delete-snag-list.component.html',
  styleUrls: ['./delete-snag-list.component.scss']
})
export class DeleteSnagListComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSnagListComponent>,
    private http: HttpClient,
    private _SnagListService: SnagListService,
    private snackBar: MatSnackBar,
    
  ) { }
  closeModal() {
    this.dialogRef.close();
  }
  async deleteSnagList() {
    await this._SnagListService.deleteAllitemsinList(this._SnagListService.ListId).subscribe();
    await this._SnagListService.deleteSnagList(this._SnagListService.ListId).subscribe();
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
