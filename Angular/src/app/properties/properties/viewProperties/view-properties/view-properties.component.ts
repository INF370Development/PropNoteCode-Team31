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





  // //Constant values
  // leftCard = [
  //   {
  //     description: 'Description: ',
  //     address: 'Address: ',
  //     suburb: 'Suburb: ',
  //     rental: 'Rental Amount: ',
  //     size: 'Size: ',
  //     yard: 'Yard: ',
  //   },
  // ];

  // image = 'https://images.prop24.com/258192045/Crop600x400';

  // rightCard1 = [
  //   {
  //     title: 'Recoveries',
  //     description: 'Description: ',
  //     type: 'Type: ',
  //     amount: 'Amount: ',
  //   },
  // ];

  // rightCard2 = [
  //   { title: 'Inspection', description: 'Description: ', date: 'Date: ' },
  // ];

  // rightCard3 = [
  //   {
  //     title: 'Lease',
  //     name: 'Name: ',
  //     surname: 'Surname: ',
  //     phone: 'Phone Number: ',
  //     company: 'Company Name: ',
  //     cphone: 'Company Phone Number: ',
  //   },
  // ];

  // //Random data
  // leftData = [
  //   {
  //     description: 'Construction site ',
  //     address: '537 Sinagoge Road ',
  //     suburb: 'Kameeldrift ',
  //     rental: 'R15 000',
  //     size: ' ',
  //     yard: '',
  //   },
  //   //{description: 'Manufacturing site' , address: '25 Ocean Drive ', suburb: 'Durbun ', rental: 'R35 000', size: ' ', yard: ''}
  // ];

  // rightData1 = [
  //   {
  //     description: 'Water damage from geyser burst ',
  //     type: 'Water ',
  //     amount: 'R5800 ',
  //   },
  //   //{description: '', type: ' ', amount: ' '},
  // ];

  // rightData2 = [
  //   {
  //     description: 'Water damage checking from geyser burst',
  //     date: '2023/07/27',
  //   },
  //   //{description: '', date: ''},
  // ];

  // rightData3 = [
  //   {
  //     name: 'Piet ',
  //     surname: 'Van Zyl',
  //     phone: '067 342 1224 ',
  //     company: 'Consitent Construction',
  //     cphone: '012 789 4561',
  //   },
  //   // {name: 'Willem ', surname: 'Prinsloo', phone: '079 890 3590 ', company: 'Manufacturing fun', cphone: '012 548 7889'},
  // ];


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
    const dialogRef = this.dialog.open(AddImageModalComponent, {});
  }

  openDeleteImageDialog() {
    const dialogRef = this.dialog.open(DeleteImageDialogComponent, {});
  }
}
