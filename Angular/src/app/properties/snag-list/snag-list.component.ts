import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnagListService } from 'src/app/services/snaglist.service'; // Update the path accordingly
import { SnagList } from 'src/app/shared/SnagList'; // Update the path accordingly
import { CreateSnagListComponent } from './create-snag-list/create-snag-list.component'; // Update the path accordingly
import { SnagListDetailsComponent } from './snag-list-details/snag-list-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-snag-list',
  templateUrl: './snag-list.component.html',
  styleUrls: ['./snag-list.component.scss']
})
export class SnagListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'propertyId',
    'snagListDescription',
    'lastModified',
    'detailsButton',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<SnagList>();

  constructor(
    private _snaglistService: SnagListService,
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
    this._snaglistService.getSnagLists().subscribe((snaglists: any) => {
      this.dataSource.data = snaglists;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteSnaglist(id: any) {
    await this._snaglistService.deleteSnagList(id);
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

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CreateSnagListComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateSnagListComponent, {});
  }
  openDetailsModal(x:any) {
    this._snaglistService.ListId=x;
    const dialogRef = this.dialog.open(SnagListDetailsComponent, {});
  }
}
