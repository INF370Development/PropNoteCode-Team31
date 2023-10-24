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
import { DeleteContracorDialogComponent } from './deleteContractorDialog/delete-contracor-dialog/delete-contracor-dialog.component';

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
    'updateButton',
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
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Contractor, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.user.name.toLowerCase().includes(lowerCaseFilter) ||
        data.user.surname.toLowerCase().includes(lowerCaseFilter) ||
        data.user.email.toLowerCase().includes(lowerCaseFilter) ||
        data.user.phoneNumber.includes(filter) ||
        data.areaOfBusiness.toLowerCase().includes(lowerCaseFilter) ||
        data.availability.includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

  refreshTableData() {
    this._contractorService.getContractors().subscribe((contractor: any) => {
      this.dataSource.data = contractor;
    });
  }

  openCreateContractorModal() {
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

   openDeleteRecoveriesDialog() {
    const dialogRef = this.dialog.open(DeleteContracorDialogComponent, {});
  }

  confirmDeleteContractor(contracor: Contractor) {
    const dialogRef = this.dialog.open(DeleteContracorDialogComponent, {
      data: { contracor }, // Pass the inspection data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // User confirmed the deletion, implement the deletion logic here
        this.deleteContractor(contracor.contractorID);
      }
    });
  }


  deleteContractor(contractorId: number) {
    this._contractorService.deleteContractor(contractorId).subscribe(
      () => {
        this.snackBar.open('Contractor deleted successfully', 'Close', {
          duration: 2000,
        });
        this.refreshTableData();
      },
      (error) => {
        console.error('Error deleting contractor:', error);
        this.snackBar.open('Error deleting contractor', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
