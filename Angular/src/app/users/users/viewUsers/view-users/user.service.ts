import { Injectable } from '@angular/core';

interface UserType {
  email: string,
  userRole: string,
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userDetails: any[] = [];

  constructor() { }

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
    this.userDetails.splice(index, 1)
  }
}
