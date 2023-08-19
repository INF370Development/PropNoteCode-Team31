import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/shared/Contractor';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-contractors',
  templateUrl: './view-contractors.component.html',
  styleUrls: ['./view-contractors.component.scss']
})

export class ViewContractorsComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string[] = [
    'firstName', 
    'lastName', 
    'email', 
    'contact', 
    'action',
    'updateButton',
    'deleteButton'
  ];

  dataSource = new MatTableDataSource<Contractor>();
  
  constructor(
    private _contractorService: ContractorService,
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
    this._contractorService.getContractors().subscribe((contractors: any) => {
      this.dataSource.data = contractors;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteContractor(id: any) {
    await this._contractorService.deleteContractor(id);
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

  /*openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CreateUModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateUModalComponent);

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.success) {
      this.dataSource.data = [...this.dataSource.data, result.user];
    }
  });
  }*/
}
  




/*private getUsers() {
    this.userDetails = new MatTableDataSource<Element>(this.ContractorServiceService.getUser());
  }

  public openPopup() {
    const dialogRef = this.dialog.open(AddcontractorComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public editUser(index: any, data: { id: any; action: string; }) {
    data.id = index;
    data.action = 'edit';
    const dialogRef = this.dialog.open(AddcontractorComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public deleteUser(index: number) {
    const data = {
      action: 'delete'
    }
    const dialogRef = this.dialog.open(AddcontractorComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ContractorServiceService.deleteUser(index);
        this.getUsers();
      }
    });
  }*/