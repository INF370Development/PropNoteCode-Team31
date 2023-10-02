import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaseService } from 'src/app/services/lease.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/shared/Maintenance';
import { AssignDialogComponent } from '../assign-dialog/assign-dialog.component';

@Component({
  selector: 'app-assign-maintenance',
  templateUrl: './assign-maintenance.component.html',
  styleUrls: ['./assign-maintenance.component.scss']
})
export class AssignMaintenanceComponent implements OnInit {
  maintenanceRequests: Maintenance[] = [];

  constructor(private maintenanceService: MaintenanceService, private dialog: MatDialog, private leaseService : LeaseService) {
    // Initialize maintenanceRequests as an empty array in the constructor
    this.maintenanceRequests = [];
  }

  ngOnInit(): void {
    this.loadMaintenanceRequests();
  }

  loadMaintenanceRequests() {
    this.maintenanceService.getMaintenances().subscribe((data) => {
      this.maintenanceRequests = data;
      // Fetch complete Tenant and Property objects for each lease
      this.maintenanceRequests.forEach((maintenanceRequest) => {
        console.log("MaintenanceID", maintenanceRequest)
        this.maintenanceService.getMaintenanceNotesByMaintenanceID(maintenanceRequest.maintenanceID).subscribe((maintenanceNotes) => {
          // Check if maintenanceNotes is an array and extract the first note (you may need more logic here)
          if (Array.isArray(maintenanceNotes) && maintenanceNotes.length > 0) {
            maintenanceRequest.maintenanceNote = maintenanceNotes[0];
          }
        });
        this.leaseService.getPropertyById(maintenanceRequest.propertyID).subscribe((property) => {
          maintenanceRequest.property = property;
        });


      });
    });
  }

  openAssignMaintenanceDialog(request: Maintenance): void {
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      width: '400px', // Set the width of the dialog
      data: { request }, // Pass data to the dialog (in this case, the request object)
    });

    // Subscribe to the dialog's afterClosed() event to handle the result when the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result from the dialog if needed
        console.log('Dialog result:', result);
      }
    });
  }

  assignMaintenance(request: Maintenance) {
    // Implement logic to open a modal for assigning maintenance here
    // You can use Angular Material's MatDialog for the modal
  }
}
