import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

NgModule({
  imports: [
    MatDialogModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatIcon],
  }) 

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.scss']
})
export class ViewPropertiesComponent {
  
  //Constant values
  leftCard = [
    {description: 'Description: ', address: 'Address: ', suburb: 'Suburb: ', rental: 'Rental Amount: ', size: 'Size: ', yard: 'Yard: '}
  ]

  image = 'https://images.prop24.com/258192045/Crop600x400'; 

  rightCard1 = [
    {title: 'Recoveries', description: 'Description: ', type: 'Type: ', amount: 'Amount: '},
  ]

  rightCard2 = [
    {title: 'Inspection', description: 'Description: ', date: 'Date: '},
  ]
  
  rightCard3 = [
    {title: 'Lease', name: 'Name: ', surname: 'Surname: ', phone: 'Phone Number: ', company: 'Company Name: ', cphone: 'Company Phone Number: '},
  ]
  
  //Random data
  leftData = [ 
    {description: 'Construction site ', address: '537 Sinagoge Road ', suburb: 'Kameeldrift ', rental: 'R15 000', size: ' ', yard: ''}
  ]

  rightData1 = [
    {description: 'Water damage from geyser burst ', type: 'Water ', amount: 'R5800 '},
  ]
  
  rightData2 = [
    {description: 'Water damage checking from geyser burst', date: '2023/07/27'},
  ]

  rightData3 = [
    {name: 'Piet ', surname: 'Van Zyl', phone: '067 342 1224 ', company: 'Consitent Construction', cphone: '012 789 4561'},
  ]
  

  constructor(public dialog: MatDialog) {}



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
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
      const dialogRef = this.dialog.open(CreatePropertiesModalComponent, {
      })
    }

    openDeletePropertyDiaglog() {
      const dialogRef = this.dialog.open(DeletePropertyDialogComponent, {
      })
    }

    openDeleteRecoveriesDiaglog() {
      const dialogRef = this.dialog.open(DeleteRecoveriesDialogComponent, {
      })
    }

    openDeleteInspectionDiaglog() {
      const dialogRef = this.dialog.open(DeleteInspectionDialogComponent, {
      })
    }

    openDeleteTenantDiaglog() {
      const dialogRef = this.dialog.open(DeleteTenantDialogComponent, {
      })
    }

    openAddInspectionModal() {
      const dialogRef = this.dialog.open(AddInspectionModalComponent, {
      })
    }

    openAddRecoveriesModal() {
      const dialogRef = this.dialog.open(AddRecoveriesModalComponent, {
      })
    }

    openAddTenantModal() {
      const dialogRef = this.dialog.open(AddTenantModalComponent, {
      })
    }

    openAddImageModal() {
      const dialogRef = this.dialog.open(AddImageModalComponent, {
      })
    }

    openDeleteImageDiaglog() {
      const dialogRef = this.dialog.open(DeleteImageDialogComponent, {
      })
    }
}
