import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../shared/UserModels/Employee';
import { map, Observable, Subject, of } from 'rxjs';
import { UserEmployee } from '../shared/UserModels/UserEmployee';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  // CREATE
  createEmployee(userEmployee: UserEmployee) {
    return this.httpClient
      .post(`${this._apiUrl}/User/CreateEmployeeUser`, userEmployee, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  // READ
  getEmployees(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(`${this._apiUrl}/Employee/GetAllEmployees`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  // UPDATE
  /*updateUser(userID: number) {
  return this.http
    .put<User[]>(`${this._apiUrl}/User/DeleteUser/${userID}`)
    .pipe(map((result) => result));
}*/

  // DELETE
  deleteEmployee(employeeID: number) {
    return this.httpClient
      .delete(`${this._apiUrl}/User/DeleteUser/${employeeID}`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  // SEARCH
  getEmployee(employeeID: number, employee: Employee) {
    return this.httpClient
      .post(`${this._apiUrl}/User/GetUserByID/${employeeID}`, employee, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getEmployeeU(employeeID: number) {
    return this.httpClient.get<Employee>(
      `${this._apiUrl}/Employee/GetEmployeeByID` + '/' + employeeID,
      {
        headers: this.headers,
      }
    );
  }
}
