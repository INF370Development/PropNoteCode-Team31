import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/User';
import { CreateUserModalComponent } from '../../CreateUserModal/createUModal/create-umodal/create-umodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})

export class ViewUsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'email',
    'userRole',
    'detailsButton',
    'updateButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<User>();

  constructor(
    private _userService: UserService,
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
    this._userService.getUsers().subscribe((users: any) => {
      this.dataSource.data = users;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteUser(id: any) {
    await this._userService.deleteUser(id);
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
    this.dialog.open(CreateUserModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateUserModalComponent);

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.success) {
      this.dataSource.data = [...this.dataSource.data, result.user];
    }
  });
  }
}
