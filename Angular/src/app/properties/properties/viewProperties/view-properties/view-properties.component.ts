import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

NgModule({
  imports: [
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
});

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.scss'],
})
export class ViewPropertiesComponent implements AfterViewInit {
  propertyDetail : Property = new Property();

  constructor(public dialog: MatDialog, private _propertiesService: PropertiesService, private route:ActivatedRoute) {
    console.log("property details", Property)
  }

  ngAfterViewInit(): void {
this.loadPropertry();
}

loadPropertry()
{
  this._propertiesService.getProperty(this.route.snapshot.params['id']).subscribe((result) =>
  {
    this.propertyDetail = result
    console.log("Property Result", result)
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
    const dialogRef = this.dialog.open(AddInspectionModalComponent, {});
  }

  openAddRecoveriesModal() {
    const dialogRef = this.dialog.open(AddRecoveriesModalComponent, {});
  }

  openAddTenantModal() {
    const dialogRef = this.dialog.open(AddTenantModalComponent, {});
  }

  openAddImageModal() {
    const dialogRef = this.dialog.open(AddImageModalComponent, {
      data: { propertyId: this.propertyDetail.propertyID } // Pass propertyId to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
  }

  openDeleteImageDialog() {
    const dialogRef = this.dialog.open(DeleteImageDialogComponent, {});
  }
}
