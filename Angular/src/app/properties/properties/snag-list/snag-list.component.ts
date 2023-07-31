import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-snag-list',
  templateUrl: './snag-list.component.html',
  styleUrls: ['./snag-list.component.scss']
})

export class SnagListComponent {

  public SnagListItems: any;
  public SnagLists: any;
  public SnagList: any;
  public Properties: any;
  public SnagListItemsEdit: any;
  public SnagListItem: any;
  public postJsonValue: any;
  public SnagListId: any;
  public PropertyId:any;
  public isSnagVisible: boolean = true;
  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public isDelete: boolean = false;
  
  constructor(private http: HttpClient){

  }
  

  ngOnInit() {
    this.getAllSnagLists();
    this.UpdateCount();
  }
  public async getAllProperties(){
    const apiUrl = 'https://localhost:7108/api/Property/GetAllProperties';

    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.Properties = response;
      });
  }
  public async getAllSnagListItems(){
    const apiUrl = 'https://localhost:7108/api/SnagList/GetAllSnagListItems';

    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListItems = response;
      });
  }
  public async getAllSnagLists(){
    const apiUrl = 'https://localhost:7108/api/SnagList/GetAllSnagLists';

    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagLists = response;
      });
  }
  public async getSnagList(f:number){
    let apiUrl: string;
     apiUrl = 'https://localhost:7108/api/SnagList/GetSnagList/'+f;
    this.postJsonValue=apiUrl;
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagList = response;
      });
  }
  public async AddSnagList(x:any){
    
        const apiUrl = `https://localhost:7108/api/SnagList/AddSnagList?PropertyId=${encodeURIComponent(this.PropertyId)}&description=${encodeURIComponent(x)}`;
    
    
        await this.http.post(apiUrl, null).subscribe(
          () => {
            console.log('Snag list item added successfully');
          });
          window.location.reload();
  }
  public async EditSnagList(des:any){
    
    const apiUrl = `https://localhost:7108/api/SnagList/EditSnagList/${this.SnagListId}??PropertyId=${this.PropertyId}&description=${des}`;
    this.http.put(apiUrl, null, ).subscribe(
      () => {
        console.log('Snag list edited successfully');
      });
      this.CloseEdit();
      window.location.reload();
  }
  public async ShowSnagListItems(i:any){
    
    const apiUrl = `https://localhost:7108/api/SnagList/GetSnagListItemLines/${i}`;
    this.postJsonValue=apiUrl;
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

    const apiUrl = `https://localhost:7108/api/SnagList/DeleteSnagListItemLine/${ListId}?ItemId=${itemId}`;
    await this.http.delete(apiUrl).subscribe(
      () => {
        console.log(`Item with ID ${itemId} deleted successfully from Snag List with ID ${ListId}`);
      });
  }
  
  public async AddItemToList(itemId:any,ListId:number)
  {
    const apiUrl = `https://localhost:7108/api/SnagList/AddSnagListItemLine?SnagListId=${ListId}&SnagListItemId=${itemId}`;
    await this.http.post(apiUrl,null).subscribe(
      () => {
        console.log(`Item with ID ${itemId} deleted successfully from Snag List with ID ${ListId}`);
      });
      window.location.reload();
  }
  public async UpdateCount() {
    const apiUrl = `https://localhost:7108/api/SnagList/CountSnagLists`;
    this.postJsonValue=apiUrl;
    await this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.SnagListId = response;
      });
  }

  public async deleteSnagList(itemId:any) {
    const apiUrl = `https://localhost:7108/api/SnagList/DeleteSnagList/${itemId}`;

    this.http.delete(apiUrl).subscribe(
      () => {
        console.log(`Snag list item with ID ${itemId} deleted successfully`);
      });
      window.location.reload();
    }
    public async updatePropId(f:any)
    {
      this.PropertyId=f;
    }
    AddList()
    {
      this.getAllSnagListItems();
      this.isSnagVisible=false;
      this.isAdd=true;
    }
    CloseAddList()
    {
      this.getAllSnagListItems();
      this.isSnagVisible=true;
      this.isAdd=false;
    }
    Edit(i:any)
    {
      this.SnagListId=i;
      this.ShowSnagListItems(i);
      this.getSnagList(i);
      this.isSnagVisible=false;
      this.isEdit=true;
    }
    CloseEdit()
    {
      const editDiv=document.getElementById('EditModal');
      if(editDiv!=null)
      {
        editDiv.style.display='none';
      }
      this.isSnagVisible=true;
      this.isEdit=false;
    }
    Delete(i:any)
    {
      this.SnagListId=i;
      this.ShowSnagListItems(i);
      this.getSnagList(i);
      this.isSnagVisible=false;
      this.isDelete=true;
    }
    CloseDelete()
    {
      this.isSnagVisible=true;
      this.isDelete=false;
    }
}

