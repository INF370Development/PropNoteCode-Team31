import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnaglistitemService } from 'src/app/services/snaglistitem.service';
import { Snaglistitem } from 'src/app/shared/SnagListItem';
import { CreateSnagListItemComponent } from './create-snag-list-item/create-snag-list-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-snag-list-item',
  templateUrl: './snag-list-item.component.html',
  styleUrls: ['./snag-list-item.component.scss']
})
export class SnagListItemComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'snagListItemDescription',
    'detailsButton',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<Snaglistitem>();

  constructor(
    private _snaglistitemService: SnaglistitemService,
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
    this._snaglistitemService.getSnaglistitems().subscribe((snaglistitems: any) => {
      this.dataSource.data = snaglistitems;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteSnaglistitem(id: any) {
    await this._snaglistitemService.deleteSnaglistitem(id);
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
    this.dialog.open(CreateSnagListItemComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateSnagListItemComponent, {});
  }
}
