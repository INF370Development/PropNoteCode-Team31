import { Injectable } from '@angular/core';

interface SnagListType {
  snagListDescription: string
}

@Injectable({ 
  providedIn: 'root'
})
export class SnaglistService {
  userDetails: SnagListType[] = [];
  constructor() { }
  public ItemsInAList:any;
  public getUser() {
    return this.userDetails;
  }

  public addUser(data: SnagListType) {
    this.userDetails.push(data);
  }

  public editUser(index: number, data: SnagListType) {
    this.userDetails[index] = data;
  }

  public deleteUser(index: number) {
    this.userDetails.splice(index, 1);
  }
}
