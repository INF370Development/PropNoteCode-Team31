import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Deposit, DepositRequest, Lease, LeaseRequest } from '../shared/Leases/Leases';
import { Tenant, TenantApiResponse } from '../shared/UserModels/Tenant';
import { Property } from '../shared/Property/Property';
import { PropertiesService } from './properties.service';
import { TenantService } from './tenant.service';


@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private baseUrl = 'https://localhost:7251/api/Lease'; // Replace with your actual API base URL

  constructor(private http: HttpClient,
    private propertiesService: PropertiesService, // Inject PropertiesService
    private tenantService: TenantService // Inject TenantService
    ) { }

  getAllLeases(): Observable<Lease[]> {
    return this.http.get<Lease[]>(`${this.baseUrl}/GetAllLeases`);
  }

  getLeaseById(leaseId: number): Observable<Lease> {
    return this.http.get<Lease>(`${this.baseUrl}/GetLeaseById/${leaseId}`);
  }

  addLease(leaseRequest: LeaseRequest): Observable<Lease> {
    return this.http.post<Lease>(`${this.baseUrl}/AddLease`, leaseRequest);
  }

  editLease(leaseId: number, lease: Lease): Observable<Lease> {
    return this.http.put<Lease>(`${this.baseUrl}/EditLease/${leaseId}`, lease);
  }

  deleteLease(leaseId: number): Observable<Lease> {
    return this.http.delete<Lease>(`${this.baseUrl}/DeleteLease/${leaseId}`);
  }

  addDeposit(leaseId: number, depositRequest: DepositRequest): Observable<Deposit> {
    return this.http.post<Deposit>(`${this.baseUrl}/${leaseId}/AddDeposit`, depositRequest);
  }

  editDeposit(depositId: number, depositRequest: DepositRequest): Observable<Deposit> {
    return this.http.put<Deposit>(`${this.baseUrl}/EditDeposit/${depositId}`, depositRequest);
  }

  deleteDeposit(depositId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/DeleteDeposit/${depositId}`);
  }

  getAllDeposits(): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${this.baseUrl}/GetAllDeposits`);
  }

  getAllDepositsByLease(leaseId: number): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${this.baseUrl}/${leaseId}/GetAllDepositsByLease`);
  }

  getTenant(tenantID: number): Observable<TenantApiResponse> {
    return this.http.get<TenantApiResponse>(`https://localhost:7251/api/Tenant/GetTenantByID/${tenantID}`);
  }

  getPropertyById(propertyID: number): Observable<Property> {
    return this.propertiesService.getProperty(propertyID); // Use PropertiesService method
  }
}
