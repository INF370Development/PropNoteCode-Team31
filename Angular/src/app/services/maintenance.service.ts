import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenance } from '../shared/Maintenance';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getMaintenances(): Observable<Maintenance[]> {
    return this._httpClient
      .get<Maintenance[]>(`https://localhost:7251/api/Maintenance/GetAllMaintenances`)
      .pipe(map((result) => result));
  }

  getMaintenance(maintenanceID: number) {
    return this._httpClient
     .get<Maintenance>(`https://localhost:7251/api/Maintenance/GetMaintenanceByID` + "/" + maintenanceID);
 }

  deleteMaintenances(maintenanceID: number) {
    return this._httpClient
      .delete(`https://localhost:7251/api/Maintenance/DeleteMaintenance/?propertyID=${maintenanceID}`)
      .pipe(map((result) => result));
  }

  createMaintenance(maintenance: Maintenance) {
    return this._httpClient
      .post(`https://localhost:7251/api/Maintenance/AddMaintenance`, maintenance)
      .pipe(map((result) => result));
  }
}
