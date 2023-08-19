import { Injectable } from '@angular/core';

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  userDetails: any[] = [];
  constructor() {}

  public getUser() {
    return this.userDetails;
  }

  public addUser(data: UserType) {
    this.userDetails.push(data);
  }

  public editUser(index: number, data: UserType) {
    this.userDetails[index] = data;
  }

  public deleteUser(index: number) {
    this.userDetails.splice(index, 1);
  }
}
