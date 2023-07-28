import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from 'src/app/shared/employee';


@Injectable({
  providedIn: 'root',
})

export class EmployeeServiceService {
  constructor(private httpClient: HttpClient) {}

 apiUrl = 'https://localhost:7251/api'

 httpOptions ={
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })
}

  getEmployee(EmployeeID: number) {
    return this.httpClient.get(`${this.apiUrl}Employee/GetEmployee` + "/" + EmployeeID)
    .pipe(map(result => result))
  }

  getEmployees(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Employee/GetAllEmployees`)
    .pipe(map(result => result))
  }

  addEmployee(employee: Employee)
  {
    return this.httpClient.post(`${this.apiUrl}Employee/AddEmployee`, employee, this.httpOptions)
  }

  deleteEmployee(EmployeeID: number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Employee/DeleteEmployee` + "/" + EmployeeID, this.httpOptions)
  }

  editEmployee(EmployeeID: number, Employee: Employee)
  {
    return this.httpClient.put(`${this.apiUrl}Employee/EditEmployee/${EmployeeID}`,Employee, this.httpOptions)
  }

}
