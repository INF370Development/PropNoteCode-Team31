import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnagListService } from 'src/app/services/snaglist.service'; // Update the import
import { SnaglistitemService } from 'src/app/services/snaglistitem.service';
import { SnagList } from 'src/app/shared/SnagList'; // Update the import
import { HttpClient } from '@angular/common/http';
import { Snaglistitem } from 'src/app/shared/SnagListItem';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-snag-list-details',
  templateUrl: './snag-list-details.component.html',
  styleUrls: ['./snag-list-details.component.scss']
})
export class SnagListDetailsComponent {
  displayedColumns: string[] = [
    'snagListItemDescription'
  ];
  dataSource = new MatTableDataSource<Snaglistitem>();
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;


  constructor(
    private _snaglistService: SnagListService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private http: HttpClient,
    private dialogRef: MatDialogRef<SnagListDetailsComponent>,
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
      this.ShowSnagListItems(this._snaglistService.ListId);
      this.dataSource.data = this._snaglistService.ItemsInAList;
  }

  public async ShowSnagListItems(i:any){
    
    const apiUrl = `https://localhost:7251/api/SnagList/GetSnagListItemLines/${i}`;
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this._snaglistService.ItemsInAList = response;
      });;
  }
  closeModal() {
    this.dialogRef.close();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
