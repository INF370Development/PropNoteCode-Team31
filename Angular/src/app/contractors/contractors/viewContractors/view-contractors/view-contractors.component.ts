
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddcontractorComponent } from '../../addcontractor/addcontractor.component';
import { ContractorServiceService } from './contractor-service.service';


@Component({
  selector: 'app-view-contractors',
  templateUrl: './view-contractors.component.html',
  styleUrls: ['./view-contractors.component.scss']
})
export class ViewContractorsComponent implements OnInit {
  displayedColumns: string[] = ['Id','First Name', 'Last Name', 'Email', 'Contact', 'Action'];
  userDetails!: MatTableDataSource<Element>;
  
  constructor(
    public dialog: MatDialog,
    public ContractorServiceService: ContractorServiceService,
  ) { }

  ngOnInit(): void {
  }

  private getUsers() {
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
  }
}

