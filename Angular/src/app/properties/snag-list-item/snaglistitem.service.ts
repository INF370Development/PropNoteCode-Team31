import { Injectable } from '@angular/core';

interface SnaglistitemType {
  snagListItemDescription: string
}

@Injectable({ 
  providedIn: 'root'
})
export class SnaglistitemService {
  userDetails: SnaglistitemType[] = [];
  constructor() { }

  public getUser() {
    return this.userDetails;
  }

  public addUser(data: SnaglistitemType) {
    this.userDetails.push(data);
  }

  public editUser(index: number, data: SnaglistitemType) {
    this.userDetails[index] = data;
  }

  public deleteUser(index: number) {
    this.userDetails.splice(index, 1);
  }
}
