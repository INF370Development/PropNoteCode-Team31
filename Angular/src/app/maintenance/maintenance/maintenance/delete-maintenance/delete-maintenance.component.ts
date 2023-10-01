import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrokerService } from 'src/app/services/broker.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-delete-maintenance',
  templateUrl: './delete-maintenance.component.html',
  styleUrls: ['./delete-maintenance.component.scss']
})
export class DeleteMaintenanceComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteMaintenanceComponent>,
    private http: HttpClient,
    private _maintenanceService: MaintenanceService,
    private _brokerService: BrokerService,
    private snackBar: MatSnackBar,
    
  ) { }
  closeModal() {
    this.dialogRef.close();
  }
  async deleteMaintenance() {
    await this._maintenanceService.deleteMaintenanceNote(this._maintenanceService.MaintenanceId).subscribe();
    await this._maintenanceService.deletePayment(this._maintenanceService.MaintenanceId).subscribe();
    await this._maintenanceService.deleteMaintenance(this._maintenanceService.MaintenanceId).subscribe();
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
