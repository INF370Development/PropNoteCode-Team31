import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Deposit,
  DepositRequest,
  Lease,
  LeaseRequest,
} from '../shared/Leases/Leases';
import { Tenant } from '../shared/UserModels/Tenant';
import { Property } from '../shared/Property/Property';
import { PropertiesService } from './properties.service';
import { TenantService } from './tenant.service';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class LeaseService {
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  }); // Replace with your actual API base URL

  constructor(
    private http: HttpClient,
    private propertiesService: PropertiesService, // Inject PropertiesService
    private tenantService: TenantService // Inject TenantService
  ) {}

  getAllLeases(): Observable<Lease[]> {
    return this.http.get<Lease[]>(`${this._apiUrl}/Lease/GetAllLeases`, {
      headers: this.headers,
    });
  }

  getLeaseById(leaseId: number): Observable<Lease> {
    return this.http.get<Lease>(
      `${this._apiUrl}/Lease/GetLeaseById/${leaseId}`,
      {
        headers: this.headers,
      }
    );
  }

  addLease(leaseRequest: LeaseRequest): Observable<Lease> {
    return this.http.post<Lease>(
      `${this._apiUrl}/Lease/AddLease`,
      leaseRequest,
      {
        headers: this.headers,
      }
    );
  }

  editLease(leaseId: number, lease: Lease): Observable<Lease> {
    return this.http.put<Lease>(
      `${this._apiUrl}/Lease/EditLease/${leaseId}`,
      lease,
      {
        headers: this.headers,
      }
    );
  }

  deleteLease(leaseId: number): Observable<Lease> {
    return this.http.delete<Lease>(
      `${this._apiUrl}/Lease/DeleteLease/${leaseId}`,
      {
        headers: this.headers,
      }
    );
  }

  addDeposit(
    leaseId: number,
    depositRequest: DepositRequest
  ): Observable<Deposit> {
    debugger;
    return this.http.post<Deposit>(
      `${this._apiUrl}/Lease/${leaseId}/AddDeposit`,
      depositRequest
    );
  }

  editDeposit(
    depositId: number,
    depositRequest: DepositRequest
  ): Observable<Deposit> {
    return this.http.put<Deposit>(
      `${this._apiUrl}/Lease/EditDeposit/${depositId}`,
      depositRequest,
      {
        headers: this.headers,
      }
    );
  }

  deleteDeposit(depositId: number): Observable<string> {
    return this.http.delete<string>(
      `${this._apiUrl}/Lease/DeleteDeposit/${depositId}`,
      {
        headers: this.headers,
      }
    );
  }

  getAllDeposits(): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${this._apiUrl}/Lease/GetAllDeposits`, {
      headers: this.headers,
    });
  }

  getAllDepositsByLease(leaseId: number): Observable<Deposit> {
    return this.http.get<Deposit>(
      `${this._apiUrl}/Lease/${leaseId}/GetAllDepositsByLease`,
      {
        headers: this.headers,
      }
    );
  }

  getTenant(tenantID: number): Observable<Tenant> {
    return this.http.get<Tenant>(
      `${this._apiUrl}/Tenant/GetTenantByID/${tenantID}`,
      {
        headers: this.headers,
      }
    );
  }

  getPropertyById(propertyID: number): Observable<Property> {
    return this.propertiesService.getProperty(propertyID); // Use PropertiesService method
  }
}
