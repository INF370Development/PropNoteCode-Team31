import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContractorService } from 'src/app/services/contractor.service';
import { MatDialog } from '@angular/material/dialog';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { CreateContractorModalComponent } from './createContractorModal/create-contractor-modal/create-contractor-modal.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-contractors',
  templateUrl: './view-contractors.component.html',
  styleUrls: ['./view-contractors.component.scss']
})

export class ViewContractorsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'areaOfBusiness',
    'availability',
    'contractorType',
    'detailsButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<Contractor>();

  constructor(
    private _contractorService: ContractorService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this._contractorService.getContractors().subscribe((contractors: any) => {
      this.dataSource.data = contractors;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  refreshTableData() {
    this._contractorService.getContractors().subscribe((contractors: any) => {
      this.dataSource.data = contractors;
    });
  }

  openCreateTenantModal() {
    const dialogRef = this.dialog.open(CreateContractorModalComponent);

    dialogRef.afterClosed().subscribe((formData: any) => {
      if (formData) {
        this._contractorService.createContractor(formData).subscribe((newContractor: any) => {
          this.refreshTableData();
          this.cdr.detectChanges();
        });
      }
    });
  }
}
