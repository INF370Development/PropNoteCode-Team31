import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';



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

  
}
