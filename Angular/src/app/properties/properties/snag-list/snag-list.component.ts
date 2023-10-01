import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { SnagListService } from 'src/app/services/snaglist.service';
  import { SnagList } from 'src/app/shared/SnagList';
  import { CreateSnagListComponent } from './create-snag-list/create-snag-list.component';
  import { MatDialog } from '@angular/material/dialog';
import { EditSnagListComponent } from './edit-snag-list/edit-snag-list.component';
import { ViewItemsComponent } from './view-items/view-items.component';
import { SnagListItemsComponent } from './snag-list-items/snag-list-items.component';
import { DeleteSnagListComponent } from './delete-snag-list/delete-snag-list.component';


@Component({
  selector: 'app-snag-list',
  templateUrl: './snag-list.component.html',
  styleUrls: ['./snag-list.component.scss']
})
export class SnagListComponent implements OnInit{
  displayedColumns: string[] = [
    'propertyId',
    'snagListDescription',
    'snagListCreated',
    'snagListModified',
    'items',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private _SnagListService: SnagListService,
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
    this._SnagListService.getSnagLists().subscribe((Items: any) => {
      this.dataSource.data = Items;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSnaglist(id: any) {
    this._SnagListService.ListId=id;
    const dialogRef = this.dialog.open(DeleteSnagListComponent, {});
    //this.showSnackBar();
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
  ViewList(x:any)
  {
    this._SnagListService.LiistID=x;
    const dialogRef = this.dialog.open(ViewItemsComponent, {});
  }
  EditList(x:any)
  {
    this._SnagListService.LiistID=x;
    const dialogRef = this.dialog.open(EditSnagListComponent, {});
  }
  openModal() {
    const dialogRef = this.dialog.open(CreateSnagListComponent, {});
  }
}
