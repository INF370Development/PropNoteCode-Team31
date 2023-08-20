import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete-tenant-dialog',
  templateUrl: './delete-tenant-dialog.component.html',
  styleUrls: ['./delete-tenant-dialog.component.scss']
})
export class DeleteTenantDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCancelClick(): void {
      this.dialogRef.close(false);
    }
  
    onDeleteClick(): void {
      this.dialogRef.close(true);
    }

  /*async deleteTenant(id: any) {
    const confirmed = confirm('Are you sure you want to delete this tenant?');
    if (!confirmed) {
      return;
    }
    
    try {
      await this._tenantService.deleteTenant(id);
      this.dataSource.data = this.dataSource.data.filter((tenant) => tenant.id !== id);
      this.showSnackBar('Deleted successfully');
    } catch (error) {
      console.error('Error deleting tenant:', error);
      this.showSnackBar('Error deleting tenant', true);
    }
  }
  showSnackBar(message: string, isError = false) {
    const panelClass = isError ? 'error-snackbar' : '';
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: panelClass,
    });
  
    snackBarRef.afterDismissed().subscribe(() => {
      // No need to reload the page; the table is already updated
    });
  }*/
}