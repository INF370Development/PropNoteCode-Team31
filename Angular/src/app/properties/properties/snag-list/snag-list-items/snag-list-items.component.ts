import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { SnagListService } from 'src/app/services/snaglist.service';
  import { Snaglistitem } from 'src/app/shared/SnagListItem';
  import { CreateSnagListItemsComponent } from './create-snag-list-items/create-snag-list-items.component';
  import { MatDialog } from '@angular/material/dialog';
import { EditSnagListItemsComponent } from './edit-snag-list-items/edit-snag-list-items.component';


@Component({
  selector: 'app-snag-list-items',
  templateUrl: './snag-list-items.component.html',
  styleUrls: ['./snag-list-items.component.scss']
})
export class SnagListItemsComponent implements OnInit{
  displayedColumns: string[] = [
    'snagListItemDescription',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<Snaglistitem>();

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
    this._SnagListService.getSnaglistitems().subscribe((Items: any) => {
      this.dataSource.data = Items;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteSnaglistitem(id: any) {
    await this._SnagListService.deleteSnaglistitem(id).subscribe();
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
    this.dialog.open(CreateSnagListItemsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  EditItem(x:any)
  {
    this._SnagListService.ItemID=x;
    const dialogRef = this.dialog.open(EditSnagListItemsComponent, {});
  }
  openModal() {
    const dialogRef = this.dialog.open(CreateSnagListItemsComponent, {});
  }
}
