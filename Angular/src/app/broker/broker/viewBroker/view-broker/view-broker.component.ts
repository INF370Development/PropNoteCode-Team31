
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BrokercreatemodelComponent } from './brokercreatemodel/brokercreatemodel.component';
import { BrokerService } from './broker.service';


@Component({
  selector: 'app-view-broker',
  templateUrl: './view-broker.component.html',
  styleUrls: ['./view-broker.component.scss']
})
export class ViewBrokerComponent implements OnInit {

  displayedColumns: string[] = ['Id','First Name', 'Last Name', 'Email', 'Contact', 'Action'];
  userDetails!: MatTableDataSource<Element>;
  
  constructor(
    public dialog: MatDialog,
    public BrokerService : BrokerService ,
  ) { }

  ngOnInit(): void {
  }

  private getUsers() {
    this.userDetails = new MatTableDataSource<Element>(this.BrokerService .getUser());
  }

  public openPopup() {
    const dialogRef = this.dialog.open(BrokercreatemodelComponent, {
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
    const dialogRef = this.dialog.open(BrokercreatemodelComponent, {
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
    const dialogRef = this.dialog.open(BrokercreatemodelComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.BrokerService.deleteUser(index);
        this.getUsers();
      }
    });
  }
}


