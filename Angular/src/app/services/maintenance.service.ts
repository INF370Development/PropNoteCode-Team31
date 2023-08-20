import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenance } from '../shared/Maintenace';
import { Payment } from '../shared/Payment';
import { MaintenanceType } from '../shared/MaintenanceType'; 
import { MaintenanceStatus } from '../shared/MaintenanceStatus'; 
import { MaintenanceNote } from '../shared/MaintenanceNote'; 


import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService { // Rename the service class
  apiUrl = 'http://localhost:7251/api/';
  public ItemsInAList:any;
  public ListId:any;
  MaintenanceId:any;
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getPayments(): Observable<Payment[]> { // Rename the method
    return this._httpClient
      .get<Payment[]>(`https://localhost:7251/api/Maintenance/GetAllPayments`) // Update the API URL
      .pipe(map((result) => result));
  }
  getPayment(paymentID: number, payment: Payment) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/Maintenance/GetPayment/1${paymentID}`, // Update the API URL
        payment
      )
      .pipe(map((result) => result));
  }
  deletePayment(paymentID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/Maintenance/DeletePayment?paymentID=${paymentID}`) // Update the API URL
      .pipe(map((result) => result));
  }
  recordPayment(payment: Payment) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/Maintenance/AddPayment`, payment) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenanceTypes(): Observable<MaintenanceType[]> { // Rename the method
    return this._httpClient
      .get<MaintenanceType[]>(`https://localhost:7251/api/Maintenance/GetAllMaintenanceTypes`) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceType(maintenanceTypeID: number, maintenanceType: MaintenanceType) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/Maintenance/GetMaintenanceTypeByID/${maintenanceTypeID}`, // Update the API URL
        maintenanceType
      )
      .pipe(map((result) => result));
  }
  deleteMaintenanceType(maintenanceTypeID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/Maintenance/DeleteMaintenanceType/${maintenanceTypeID}`) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenanceType(maintenanceType: MaintenanceType) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/Maintenance/AddMaintenanceType`, maintenanceType) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenanceStatuses(): Observable<MaintenanceStatus[]> { // Rename the method
    return this._httpClient
      .get<MaintenanceStatus[]>(`https://localhost:7251/api/Maintenance/GetAllMaintenanceStatuses`) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceStatus(maintenanceTypeID: number, maintenanceType: MaintenanceStatus) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/Maintenance/GetMaintenanceStatus/${maintenanceTypeID}`, // Update the API URL
        maintenanceType
      )
      .pipe(map((result) => result));
  }
  deleteMaintenanceStatus(maintenanceTypeID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/Maintenance/DeleteMaintenanceStatus?MaintenanceStatusId=${maintenanceTypeID}`) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenanceStatus(maintenanceType: MaintenanceStatus) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/Maintenance/AddMaintenanceStatus`, maintenanceType) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenanceNotes(): Observable<MaintenanceNote[]> { // Rename the method
    return this._httpClient
      .get<MaintenanceNote[]>(`https://localhost:7251/api/Maintenance/GetAllMaintenanceNotes`) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceNote(maintenanceTypeID: number, MaintenanceNote: MaintenanceNote) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/Maintenance/GetMaintenanceNote/${maintenanceTypeID}`, // Update the API URL
        MaintenanceNote
      )
      .pipe(map((result) => result));
  }
  deleteMaintenanceNote(maintenanceTypeID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/Maintenance/DeleteMaintenanceNote?MaintenanceStatusId=${maintenanceTypeID}`) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenanceNote(maintenanceNote: MaintenanceNote) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/Maintenance/AddMaintenanceNote`, maintenanceNote) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenances(): Observable<Maintenance[]> { // Rename the method
    return this._httpClient
      .get<Maintenance[]>(`https://localhost:7251/api/Maintenance/GetAllMaintenances`) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenance(maintenanceTypeID: number, Maintenance: Maintenance) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/Maintenance/GetMaintenance/${maintenanceTypeID}`, // Update the API URL
        Maintenance
      )
      .pipe(map((result) => result));
  }
  deleteMaintenance(maintenanceTypeID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/Maintenance/DeleteMaintenance/${maintenanceTypeID}`) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenance(maintenance: Maintenance) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/Maintenance/AddMaintenance`, maintenance) // Update the API URL
      .pipe(map((result) => result));
  }
  
  EditMaintenance(x:any,maintenance: Maintenance) { // Rename the method
    return this._httpClient
      .put(`https://localhost:7251/api/Maintenance/EditMaintenance?Id=${x}`, maintenance) // Update the API URL
      .pipe(map((result) => result));
  }
}
