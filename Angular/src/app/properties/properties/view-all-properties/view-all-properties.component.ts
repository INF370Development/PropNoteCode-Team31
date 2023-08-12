import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/shared/Property/Property';
// import { CreateBrokerModalComponent } from './CreateBroker/create-broker/create-broker-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatePropertiesModalComponent } from '../create-properties-modal/create-properties-modal.component';

@Component({
  selector: 'app-view-all-properties',
  templateUrl: './view-all-properties.component.html',
  styleUrls: ['./view-all-properties.component.scss'],
})
export class ViewAllPropertiesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'description',
    'address',
    'size',
    'yard',
    'detailsButton',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<Property>();

  constructor(
    private _propertyService: PropertiesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
      this._propertyService.getProperties().subscribe((properties: any) => {
      this.dataSource.data = properties;
      console.log("Property Array", properties)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteProperty(id: any) {
    await this._propertyService.deleteProperty(id);
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

  // openDialog(
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   this.dialog.open(CreateBrokerModalComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  openModal() {
    const dialogRef = this.dialog.open(CreatePropertiesModalComponent, {});
  }
}
