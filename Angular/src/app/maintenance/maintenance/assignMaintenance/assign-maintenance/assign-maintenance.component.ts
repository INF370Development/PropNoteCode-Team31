import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { EditPaymentComponent } from '../../payment/edit-payment/edit-payment.component';
import { RecordPaymentComponent } from '../../payment/record-payment/record-payment.component';
import { AddMaintenanceNoteComponent } from '../../maintenanceNote/add-maintenance-note/add-maintenance-note.component';
import { EditMaintenanceNoteComponent } from '../../maintenanceNote/edit-maintenance-note/edit-maintenance-note.component';
import { EditMaintenanceComponent } from '../../maintenance/edit-maintenance/edit-maintenance.component';

@Component({
  selector: 'app-assign-maintenance',
  templateUrl: './assign-maintenance.component.html',
  styleUrls: ['./assign-maintenance.component.scss']
})
export class AssignMaintenanceComponent {
Maintenance:any;
  constructor(
    private _propertyService:PropertiesService,
    private _maintenanceService: MaintenanceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this._maintenanceService.getMaintenance(this._maintenanceService.MaintenanceId).subscribe((Maintenance: any) => {
      this.Maintenance= Maintenance;
    });
  }

  EditPayment(x:any)
  {
    this._maintenanceService.MaintenanceId=x;
    const dialogRef = this.dialog.open(EditPaymentComponent, {});
  }
  AddPayment(x:any)
  {
    this._maintenanceService.MaintenanceId=x;
    const dialogRef = this.dialog.open(RecordPaymentComponent, {});
  }

  AddNote(x:any)
  {
    this._maintenanceService.MaintenanceId=x;
    const dialogRef = this.dialog.open(AddMaintenanceNoteComponent, {});
  }
  EditNote(x:any)
  {
    this._maintenanceService.MaintenanceId=x;
    const dialogRef = this.dialog.open(EditMaintenanceNoteComponent, {});
  }
  EditMaintenance(){
    const dialogRef = this.dialog.open(EditMaintenanceComponent, {});
}
}
