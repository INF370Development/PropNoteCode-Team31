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
  selector: 'app-create-snag-list',
  templateUrl: './create-snag-list.component.html',
  styleUrls: ['./create-snag-list.component.scss']
})
export class CreateSnagListComponent implements OnInit {
  displayedColumns: string[] = [
    'check',
    'snagListItemDescription'
  ];
  dataSource = new MatTableDataSource<Snaglistitem>();

  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;
  public SnagListItems: any;
  public SnagListItemsEdit:any;
  SnagListId: any;
  snaglistModel: SnagList = {
    snagListDescription: '',
    propertyId: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CreateSnagListComponent>,
    private snaglistService: SnagListService, // Update the service name
    private _snaglistitemService: SnaglistitemService,
    private router: Router,
    private http: HttpClient,
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
    this.UpdateCount();
    this._snaglistitemService.getSnaglistitems().subscribe((snaglistitems: any) => {
      this.dataSource.data = snaglistitems;
    });
  }

  updateDescription(x: any) {
    this.snaglistModel.snagListDescription = x;
  }
  updateProp(x: any) {
    this.snaglistModel.propertyId = x;
  }
  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  public async UpdateCount() {
    
    const apiUrl = `https://localhost:7251/api/SnagList/lastSnagList`;
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListId = response;
      });
      this.SnagListId=1;
  }
  public async ShowSnagListItems(i:any){
    
    const apiUrl = `https://localhost:7251/api/SnagList/GetSnagListItemLines/${i}`;
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListItemsEdit = response;
      });;
  }
  handleCheckboxChange(event: any,i: number, ListId:number) 
  {
    if (event.target.checked) {
      this.AddItemToList(i,ListId);
    } else {
      this.DeleteItemToList(i,ListId);
    }
  }
  public async DeleteItemToList(itemId:any,ListId:number)
  {

    const apiUrl = `https://localhost:7251/api/SnagList/DeleteSnagListItemLine/${ListId}?ItemId=${itemId}`;
    await this.http.delete(apiUrl).subscribe(
      () => {
        console.log(`Item with ID ${itemId} deleted successfully from Snag List with ID ${ListId}`);
      });
  }
  
  public async AddItemToList(itemId:any,ListId:number)
  {
    const apiUrl = `https://localhost:7251/api/SnagList/AddSnagListItemLine?SnagListId=${ListId}&SnagListItemId=${itemId}`;
    await this.http.post(apiUrl,null).subscribe(
      () => {
        console.log(`Item with ID ${itemId} deleted successfully from Snag List with ID ${ListId}`);
      });
  }
  public async getAllSnagListItems(){
    const apiUrl = 'https://localhost:7251/api/SnagList/GetAllSnagListItems';
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListItems = response;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addSnaglist() { // Update the method name
    debugger;
    this.snaglistService.createSnagList(this.snaglistModel).subscribe(
      (response) => {
        console.log('Snaglist created successfully:', response);
        // You can optionally close the modal after creating the snaglist
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating snaglist:', error);
      }
    );
  }
}
