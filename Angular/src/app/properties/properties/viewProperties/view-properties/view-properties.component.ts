import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreatePropertiesModalComponent } from '../../create-properties-modal/create-properties-modal.component';
import { DeletePropertyDialogComponent } from './deletePropertyDialog/delete-property-dialog/delete-property-dialog.component';
import { DeleteTenantDialogComponent } from './delete-tenant-dialog/delete-tenant-dialog.component';
import { DeleteInspectionDialogComponent } from './delete-inspection-dialog/delete-inspection-dialog.component';
import { DeleteRecoveriesDialogComponent } from './deleteRecoveriesDialog/delete-recoveries-dialog/delete-recoveries-dialog.component';
import { AddInspectionModalComponent } from './addInspectionModal/add-inspection-modal/add-inspection-modal.component';
import { AddRecoveriesModalComponent } from './addRecoveriesModal/add-recoveries-modal/add-recoveries-modal.component';
import { AddTenantModalComponent } from './addTenantModal/add-tenant-modal/add-tenant-modal.component';
import { AddImageModalComponent } from './addImageModal/add-image-modal/add-image-modal.component';
import { DeleteImageDialogComponent } from './deleteImageDialog/delete-image-dialog/delete-image-dialog.component';
import { FormsModule } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/shared/Property/Property';
import { Recovery } from 'src/app/shared/Property/Recovery';
import { Inspection } from 'src/app/shared/Property/Inspection';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UpdateInspectionModalComponent } from './update-inspection-modal/update-inspection-modal.component';

NgModule({
  imports: [
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
});


declare var $: any;
@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.scss'],
})
export class ViewPropertiesComponent implements AfterViewInit {
  propertyDetail : Property = new Property();
  recoveries : Recovery[] = [];
  inspections : Inspection[] = [];

  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };

  @ViewChild('slickModal') slickModal!: ElementRef;


  slickInit(e : any) {
    console.log('slick initialized');
  }

  breakpoint(e : any) {
    console.log('breakpoint');
  }

  afterChange(e : any) {
    console.log('afterChange');
  }

  beforeChange(e : any) {
    console.log('beforeChange');
  }


  constructor(public dialog: MatDialog, private _propertiesService: PropertiesService, private route:ActivatedRoute, private sanitizer: DomSanitizer) {
    console.log("property details", Property)
  }

  ngAfterViewInit(): void {
this.loadPropertry();
this.loadRecoveries();
this.loadInspections();
this.loadPropertyImages();
}

getImageUrl(imageData: string): string {
  if (!imageData || imageData.length === 0) {
    return ''; // Return an empty string or placeholder URL
  }

  return `data:image/jpeg;base64,${imageData}`;
}

loadPropertry()
{
  this._propertiesService.getProperty(this.route.snapshot.params['id']).subscribe((result) =>
  {
    this.propertyDetail = result
    console.log("Property Result", result)
  });

}
loadRecoveries() {
  this._propertiesService.getRecoveriesForProperty(this.route.snapshot.params['id']).subscribe((recoveries) => {
    this.recoveries = recoveries;
  });
}

loadInspections() {
  this._propertiesService.getInspectionsForProperty(this.route.snapshot.params['id']).subscribe((inspections) => {
    this.inspections = inspections;
  });
}

loadPropertyImages() {
  this._propertiesService
    .getPropertyImagesByPropertyID(this.route.snapshot.params['id'])
    .subscribe((propertyImages) => {
      this.propertyDetail.propertyImage = propertyImages;

    });
}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CreatePropertiesModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.dialog.open(DeletePropertyDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  searchTerm: string = '';

  search() {
    console.log('Search term:', this.searchTerm);
  }

  openModal() {
    const dialogRef = this.dialog.open(CreatePropertiesModalComponent, {});
  }

  openDeletePropertyDialog() {
    const dialogRef = this.dialog.open(DeletePropertyDialogComponent, {});
  }

  openDeleteRecoveriesDialog() {
    const dialogRef = this.dialog.open(DeleteRecoveriesDialogComponent, {});
  }

  openDeleteInspectionDialog() {
    const dialogRef = this.dialog.open(DeleteInspectionDialogComponent, {});
  }

  openDeleteTenantDialog() {
    const dialogRef = this.dialog.open(DeleteTenantDialogComponent, {});
  }

  openAddInspectionModal() {
    const dialogRef = this.dialog.open(AddInspectionModalComponent, {
      data: { propertyID: this.propertyDetail.propertyID },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the modal is closed (if needed)
    });
  }

  openAddRecoveriesModal() {
    const dialogRef = this.dialog.open(AddRecoveriesModalComponent, {
      data: { propertyID: this.propertyDetail.propertyID },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the modal is closed (if needed)
    });
  }

  openAddTenantModal() {
    const dialogRef = this.dialog.open(AddTenantModalComponent, {});
  }

  openAddImageModal() {
    const dialogRef = this.dialog.open(AddImageModalComponent, {
      data: { propertyID: this.propertyDetail.propertyID } // Pass propertyId to the modal
    });

    dialogRef.componentInstance.imageUploaded.subscribe(() => {
      // Image was uploaded, refresh property details
      this.loadPropertry();
      // You can also update other relevant data like recoveries and inspections
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
  }

  confirmDeleteInspection(inspection: Inspection) {
    const dialogRef = this.dialog.open(DeleteInspectionDialogComponent, {
      data: { inspection }, // Pass the inspection data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // User confirmed the deletion, implement the deletion logic here
        this.deleteInspection(inspection.inspectionID);
      }
    });
  }

  deleteInspection(inspectionID: number) {
    // Call your API to delete the inspection here, e.g., using your PropertiesService
    this._propertiesService.deleteInspection(inspectionID).subscribe(
      () => {
        console.log('Inspection deleted successfully');
        // You may want to reload the inspections or update the view
        this.loadInspections();
      },
      (error) => {
        console.error('Error deleting inspection:', error);
      }
    );
  }

  openUpdateInspectionModal(inspection: Inspection) {
    const dialogRef = this.dialog.open(UpdateInspectionModalComponent, {
      data: { inspection }, // Pass the inspection to the modal
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Refresh the inspections or take any other necessary actions
        this.loadInspections();
      }
    });
  }

  openDeleteImageDialog() {
    const dialogRef = this.dialog.open(DeleteImageDialogComponent, {});
  }
}
