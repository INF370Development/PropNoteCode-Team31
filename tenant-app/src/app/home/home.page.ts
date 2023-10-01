import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Lease } from '../shared/Leases/Leases';
import { Property } from '../shared/Property/Property';
import { ModalController } from '@ionic/angular';
import { RequestMaintenanceComponent } from '../request-maintenance/request-maintenance/request-maintenance.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  properties: any[] = []; // Define a property array
  leases: Lease[] = [];
  loadingPropertyDetails = true;

  constructor(private http: HttpClient, private authService: AuthenticationService, private modalController: ModalController ) {}

  ngOnInit() {
    // Get the current user's ID
    const currentUserId = this.authService.getCurrentUserId();

    if (currentUserId !== null) {
      // Make the API request to get the tenantID based on currentUserId
      this.http
        .get<number>(`https://localhost:7251/api/Authentication/GetTenantIDForCurrentUser/${currentUserId}`)
        .subscribe(
          (tenantID) => {
            // Use the tenantID to fetch leases for the tenant
            this.http
              .get<any[]>(`https://localhost:7251/api/Lease/GetLeasesByTenantID/${tenantID}`)
              .subscribe(
                (data) => {
                  // Assign the fetched leases to the component's leases array
                  this.leases = data;
                  for (const lease of this.leases) {
                    this.getPropertyDetails(lease);
                  }
                },
                (error) => {
                  console.error('Error fetching leases:', error);
                }
              );
          },
          (error) => {
            console.error('Error fetching tenantID:', error);
          }
        );
    } else {
      // Handle the case where userID is not available
    }
  }
  getPropertyDetails(lease: Lease) {
    // Make the API request to get property details by lease ID
    this.http
      .get<Property>(`https://localhost:7251/api/Lease/GetPropertyByLeaseID/${lease.leaseID}`)
      .subscribe(
        (property) => {
          // Assign the fetched property details to the lease's property
          lease.property = property;
          this.loadingPropertyDetails = false; // Property details loaded
        },
        (error) => {
          console.error('Error fetching property details:', error);
        }
      );
  }
  async requestMaintenance(lease: Lease) {
    // Open the "Request Maintenance" component as a modal
    const modal = await this.modalController.create({
      component: RequestMaintenanceComponent, // Specify the component to open
      componentProps: {
        lease: lease, // Pass the lease data to the component if needed
      },
    });

    // Present the modal
    await modal.present();
  }
}
