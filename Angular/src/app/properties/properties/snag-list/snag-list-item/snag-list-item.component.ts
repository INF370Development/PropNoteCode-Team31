import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface TableData {
  Property: string;
  age: any;
}
@Component({
  selector: 'app-snag-list-item',
  templateUrl: './snag-list-item.component.html',
  styleUrls: ['./snag-list-item.component.scss']
})
export class SnagListItemComponent {

  public SnagListItems: any;
  public SnagListItem: any;
  public postJsonValue: any;
  public description:any;
  public to_edit: any;
  public to_delete: any;  
  public dataSource: any;
  public isSnagVisible: boolean = true;
  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public isDelete: boolean = false;

  
  constructor(private http: HttpClient){

  }
  ngOnInit() {
    this.getAllSnagListItems();
  }
  public async getAllSnagListItems(){
    const apiUrl = 'https://localhost:7108/api/SnagList/GetAllSnagListItems';

    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListItems = response;
      });
  }
  public async getSnagListItems(f:any){
    const apiUrl = `https://localhost:7108/api/SnagList/GetSnagListItem/${encodeURIComponent(f)}`;
    this.postJsonValue=apiUrl;
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListItems = response;
      });
      this.dataSource = this.SnagListItems
  }
  public async AddSnagListItem(f:string){
        const apiUrl = `https://localhost:7108/api/SnagList/AddSnagListItem?cvm=${encodeURIComponent(f)}`;
        await this.http.post(apiUrl, null).subscribe(
          () => {
            console.log('Snag list item added successfully');
          });
          this.getAllSnagListItems();
          this.CloseAdd();
  }
  public async EditSnagListItem(f:string){
    const apiUrl = `https://localhost:7108/api/SnagList/EditSnagListItem/${encodeURIComponent(this.to_edit)}?SnagListIteDescription=${encodeURIComponent(f)}`;
    this.http.put(apiUrl, null, ).subscribe(
      () => {
        console.log('Snag list item edited successfully');
      });
      this.CloseEdit();
  }
  public async DeleteSnagListItem() {
    const apiUrl = `https://localhost:7108/api/SnagList/DeleteSnagListItem/${this.to_delete}`;

    this.http.delete(apiUrl).subscribe(
      () => {
        console.log(`Snag list item with ID ${this.to_delete} deleted successfully`);
      });
      this.CloseDelete();
    }
    Add()
    {
      
      this.isSnagVisible=false;
      this.isAdd=true;
    }
    CloseAdd()
    {
      this.isSnagVisible=true;
      this.isAdd=false;
    }
    Edit(f:any,x:any)
    {
      
      this.getSnagListItems(f);
      this.to_edit=f;
      this.description=x;
      this.isSnagVisible=false;
      this.isEdit=true;
    }
    CloseEdit()
    {
      this.isSnagVisible=true;
      this.isEdit=false;
    }
    Delete(f:any)
    {
      
      this.getSnagListItems(f);
      this.to_delete=f;
      this.isSnagVisible=false;
      this.isDelete=true;
    }
    CloseDelete()
    {
      this.isSnagVisible=true;
      this.isDelete=false;
    }
    applyFilter(filterValue: any) {
      filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }

}

