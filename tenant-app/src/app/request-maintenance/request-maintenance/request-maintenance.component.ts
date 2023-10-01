import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Lease } from 'src/app/shared/Leases/Leases';
import { MaintenanceNoteViewModel } from 'src/app/shared/MaintenanceNote';

@Component({
  selector: 'app-request-maintenance',
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.scss'],
})
export class RequestMaintenanceComponent {
  @Input() maintenanceID: number | undefined;
  @Input() lease: Lease | undefined;
  maintenanceNote: string = '';

  constructor(
    private modalController: ModalController,
    private maintenanceService: MaintenanceService
  ) {}

  async submitMaintenanceRequest() {
    try {
      // Check if you have access to the lease data
      if (!this.lease || !this.lease.propertyID) {
        console.error("Invalid lease data.");
        return;
      }

      // Create a new maintenance record with the PropertyID from the lease
      const newMaintenance: any = {
        PropertyID: this.lease.propertyID,
        // Add other properties for the maintenance record as needed
      };

      // Make the API request to add the maintenance record and wait for the result
      const createdMaintenance = await this.maintenanceService.addMaintenance(newMaintenance).toPromise();

      // Check if the maintenance entry was successfully created
      if (createdMaintenance && createdMaintenance.maintenanceID) {
        // Add the maintenance note using the obtained MaintenanceID
        const maintenanceNoteViewModel: MaintenanceNoteViewModel = {
          MaintenanceID: createdMaintenance.maintenanceID,
          MaintenanceNoteDescription: this.maintenanceNote,
        };

        // Make the API request to add the maintenance note and wait for the result
        await this.maintenanceService.addMaintenanceNoteToMaintenance(createdMaintenance.maintenanceID, maintenanceNoteViewModel).toPromise();

        // Success
        console.log("Maintenance and note added successfully");
        this.modalController.dismiss();
      } else {
        console.error("Error creating maintenance entry.");
      }
    } catch (error) {
      // Error
      console.error("Error adding maintenance and note:", error);
    }
  }

  closeModal() {
    // Close the modal without submitting
    this.modalController.dismiss();
  }
}
