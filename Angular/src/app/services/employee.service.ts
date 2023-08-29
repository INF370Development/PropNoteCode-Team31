import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../shared/UserModels/Employee';
import { map, Observable, Subject, of } from 'rxjs';
import { UserEmployee } from '../shared/UserModels/UserEmployee';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

 // CREATE
 createEmployee(userEmployee: UserEmployee) { 
  return this.httpClient
    .post(`https://localhost:7251/api/User/CreateEmployeeUser`, userEmployee) 
    .pipe(map((result) => result));
}

// READ
getEmployees(): Observable<Employee[]> { 
  return this.httpClient
    .get<Employee[]>(`https://localhost:7251/api/Employee/GetAllEmployees`) 
    .pipe(map((result) => result));
}

// UPDATE 
/*updateUser(userID: number) {
  return this.http
    .put<User[]>(`https://localhost:7251/api/User/DeleteUser/${userID}`)
    .pipe(map((result) => result));
}*/

// DELETE
deleteEmployee(employeeID: number) { 
  return this.httpClient
    .delete(`https://localhost:7251/api/User/DeleteUser/${employeeID}`) 
    .pipe(map((result) => result));
}

// SEARCH
getEmployee(employeeID: number, employee: Employee) { 
  return this.httpClient
    .post(
      `https://localhost:7251/api/User/GetUserByID/${employeeID}`,
      employee
    )
    .pipe(map((result) => result));
}

getEmployeeU(employeeID: number) { 
  return this.httpClient
   .get<Employee>(`https://localhost:7251/api/Employee/GetEmployeeByID` + "/" + employeeID); 
}
}
