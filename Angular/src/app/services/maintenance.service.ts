import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../shared/Payment';
import { MaintenanceType } from '../shared/MaintenanceType';
import { MaintenanceStatus } from '../shared/MaintenanceStatus';
import { MaintenanceNote } from '../shared/MaintenanceNote';

import { map, Observable, Subject } from 'rxjs';
import { configuration } from '../config/configurationFile';
import { Maintenance } from '../shared/Maintenance';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  // Rename the service class
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });
  public ItemsInAList: any;
  public ListId: any;
  MaintenanceId: any;
  status: any;
  type: any;

  constructor(private _httpClient: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    // Rename the method
    return this._httpClient
      .get<Payment[]>(`${this._apiUrl}/Maintenance/GetAllPayments`, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  getPayment(paymentID: number) {
    // Rename the method
    return this._httpClient
      .get(
        `${this._apiUrl}/Maintenance/GetPayment/${paymentID}`,
        {
          headers: this.headers,
        } // Update the API URL
      )
      .pipe(map((result) => result));
  }

  EditPayment(x: any, maintenance: Payment) {
    return this._httpClient
      .put(`${this._apiUrl}/Maintenance/EditPayment?id=${x}`, maintenance, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  deletePayment(paymentID: number) {
    // Rename the method
    return this._httpClient
      .delete(
        `${this._apiUrl}/Maintenance/DeletePayment?paymentID=${paymentID}`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  recordPayment(payment: Payment) {
    // Rename the method
    return this._httpClient
      .post(`${this._apiUrl}/Maintenance/AddPayment`, payment, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenanceTypes(): Observable<MaintenanceType[]> {
    // Rename the method
    return this._httpClient
      .get<MaintenanceType[]>(
        `${this._apiUrl}/Maintenance/GetAllMaintenanceTypes`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceType(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .get(
        `${this._apiUrl}/Maintenance/GetMaintenanceType/${maintenanceTypeID}`,
        {
          headers: this.headers,
        } // Update the API URL
      )
      .pipe(map((result) => result));
  }
  EditMaintenancetype(x: any, maintenance: MaintenanceType) {
    return this._httpClient
      .put(
        `${this._apiUrl}/Maintenance/EditMaintenanceType?id=${x}`,
        maintenance,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  deleteMaintenanceType(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .delete(
        `${this._apiUrl}/Maintenance/DeleteMaintenanceType?MaintenanceTypeId=${maintenanceTypeID}`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenanceType(maintenanceType: MaintenanceType) {
    // Rename the method
    return this._httpClient
      .post(`${this._apiUrl}/Maintenance/AddMaintenanceType`, maintenanceType, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenanceStatuses(): Observable<MaintenanceStatus[]> {
    // Rename the method
    return this._httpClient
      .get<MaintenanceStatus[]>(
        `${this._apiUrl}/Maintenance/GetAllMaintenanceStatuses`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceStatus(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .get(
        `${this._apiUrl}/Maintenance/GetMaintenanceStatus/${maintenanceTypeID}`,
        {
          headers: this.headers,
        } // Update the API URL
      )
      .pipe(map((result) => result));
  }
  deleteMaintenanceStatus(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .delete(
        `${this._apiUrl}/Maintenance/DeleteMaintenanceStatus?MaintenanceStatusId=${maintenanceTypeID}`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }

  EditMaintenanceStatus(x: any, maintenance: MaintenanceStatus) {
    return this._httpClient
      .put(
        `${this._apiUrl}/Maintenance/EditMaintenanceStatus?id=${x}`,
        maintenance,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenanceStatus(maintenanceType: MaintenanceStatus) {
    // Rename the method
    return this._httpClient
      .post(
        `${this._apiUrl}/Maintenance/AddMaintenanceStatus`,
        maintenanceType,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenanceNotes(): Observable<MaintenanceNote[]> {
    // Rename the method
    return this._httpClient
      .get<MaintenanceNote[]>(
        `${this._apiUrl}/Maintenance/GetAllMaintenanceNotes`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceNote(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .get(
        `${this._apiUrl}/Maintenance/GetMaintenanceNote/${maintenanceTypeID}`,
        {
          headers: this.headers,
        } // Update the API URL
      )
      .pipe(map((result) => result));
  }
  EditMaintenanceNote(x: any, maintenance: MaintenanceNote) {
    // Rename the method
    return this._httpClient
      .put(
        `${this._apiUrl}/Maintenance/EditMaintenanceNote?Id=${x}`,
        maintenance,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  deleteMaintenanceNote(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .delete(
        `${this._apiUrl}/Maintenance/DeleteMaintenanceNote?MaintenanceStatusId=${maintenanceTypeID}`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenanceNote(maintenanceNote: MaintenanceNote) {
    // Rename the method
    return this._httpClient
      .post(`${this._apiUrl}/Maintenance/AddMaintenanceNote`, maintenanceNote, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  getMaintenances(): Observable<any[]> {
    // Rename the method
    return this._httpClient
      .get<any[]>(`${this._apiUrl}/Maintenance/GetAllMaintenances`, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  getMaintenanceNotesByMaintenanceID(maintenanceID: number): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this._apiUrl}/Maintenance/GetMaintenanceNotesByMaintenanceID/${maintenanceID}`);
  }

  updateMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    const url = `${this._apiUrl}/Maintenance/UpdateMaintenance/${maintenance.maintenanceID}`;

    // Send a PUT request to update the maintenance record
    return this._httpClient.put<Maintenance>(url, maintenance);
  }
  getMaintenance(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .get(
        `${this._apiUrl}/Maintenance/GetMaintenance/${maintenanceTypeID}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((result) => result));
  }
  deleteMaintenance(maintenanceTypeID: number) {
    // Rename the method
    return this._httpClient
      .delete(
        `${this._apiUrl}/Maintenance/DeleteMaintenance/${maintenanceTypeID}`,
        {
          headers: this.headers,
        }
      ) // Update the API URL
      .pipe(map((result) => result));
  }
  AddMaintenance(maintenance: Maintenance) {
    // Rename the method
    return this._httpClient
      .post(`${this._apiUrl}/Maintenance/AddMaintenance`, maintenance, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  EditMaintenance(x: any, maintenance: Maintenance) {
    // Rename the method
    return this._httpClient
      .put(`${this._apiUrl}/Maintenance/EditMaintenance?Id=${x}`, maintenance, {
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
}
