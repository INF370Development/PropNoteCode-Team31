import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../shared/Property/Property';
import { map, Observable, Subject } from 'rxjs';
import { Recovery, RecoveryType } from '../shared/Property/Recovery';
import {
  Inspection,
  InspectionRequest,
  InspectionStatus,
  InspectionType,
} from '../shared/Property/Inspection';
import { PropertyImage } from '../shared/Property/PropertyImage';
import { Problem, ProblemStatus } from '../shared/Property/Problem';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  constructor(private _httpClient: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this._httpClient
      .get<Property[]>(`${this._apiUrl}/Property/GetAllProperties`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }
  getInspections(): Observable<Inspection[]> {
    return this._httpClient
      .get<Inspection[]>(`${this._apiUrl}/Property/GetAllInspections`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  updateInspection(inspection: Inspection): Observable<any> {
    const url = `${this._apiUrl}/Property/EditInspection/${inspection.inspectionID}`;
    return this._httpClient.put(url, inspection, {
      headers: this.headers,
    });
  }

  deleteInspection(inspectionID: number): Observable<any> {
    return this._httpClient.delete(
      `${this._apiUrl}/Property/DeleteInspection/${inspectionID}`,
      {
        headers: this.headers,
      }
    );
  }

  getInspectionTypes(): Observable<InspectionType[]> {
    return this._httpClient
      .get<InspectionType[]>(`${this._apiUrl}/Property/GetAllInspectionTypes`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getInspectionStatuses(): Observable<InspectionStatus[]> {
    return this._httpClient
      .get<InspectionStatus[]>(
        `${this._apiUrl}/Property/GetAllInspectionStatuses`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((result) => result));
  }

  getRecoveries(): Observable<Recovery[]> {
    return this._httpClient
      .get<Recovery[]>(`${this._apiUrl}/Property/GetAllRecoveries`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getRecoveryTypes(): Observable<RecoveryType[]> {
    return this._httpClient
      .get<RecoveryType[]>(`${this._apiUrl}/Property/GetAllRecoveryTypes`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getInspectionsForProperty(propertyID: number): Observable<Inspection[]> {
    return this._httpClient.get<Inspection[]>(
      `${this._apiUrl}/Property/GetAllInspectionsForProperty/${propertyID}`,
      {
        headers: this.headers,
      }
    );
  }

  getRecoveriesForProperty(propertyID: number): Observable<Recovery[]> {
    return this._httpClient.get<Recovery[]>(
      `${this._apiUrl}/Property/GetAllRecoveriesForProperty/${propertyID}`,
      {
        headers: this.headers,
      }
    );
  }

  getProperty(propertyID: number) {
    return this._httpClient.get<Property>(
      `${this._apiUrl}/Property/GetPropertyByID` + '/' + propertyID,
      {
        headers: this.headers,
      }
    );
  }

  deleteProperty(propertyID: number) {
    return this._httpClient
      .delete(`${this._apiUrl}/Property/DeleteProperty` + '/' + propertyID, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  CreateProperty(property: Property) {
    return this._httpClient
      .post(`${this._apiUrl}/Property/AddProperty`, property, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  uploadPropertyImage(
    propertyId: number,
    imageFormData: FormData
  ): Observable<any> {
    return this._httpClient.post(
      `${this._apiUrl}/Property/uploadPhoto/${propertyId}`,
      imageFormData,
      {
        headers: this.headers,
      }
    );
  }

  getPropertyImagesByPropertyID(
    propertyID: number
  ): Observable<PropertyImage[]> {
    const url = `${this._apiUrl}/Property/GetPropertyImagesByPropertyID/${propertyID}`;
    return this._httpClient.get<PropertyImage[]>(url, {
      headers: this.headers,
    });
  }

  addInspection(propertyID: number, inspection: Inspection) {
    return this._httpClient
      .post(
        `${this._apiUrl}/Property/AddInspection/${propertyID}`,
        inspection,
        {
          headers: this.headers,
        }
      )
      .pipe(map((result) => result));
  }

  AddRecovery(propertyID: number, recovery: Recovery) {
    return this._httpClient
      .post(`${this._apiUrl}/Property/AddRecovery/${propertyID}`, recovery, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  AddProblem(inspectionID: number, problem: Problem) {
    return this._httpClient
      .post(`${this._apiUrl}/Property/AddProblem/${inspectionID}`, problem, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getProblemsforInspection(inspectionID: number): Observable<Problem[]> {
    return this._httpClient.get<Problem[]>(
      `${this._apiUrl}/Property/GetAllProblemsForInspection/${inspectionID}`,
      {
        headers: this.headers,
      }
    );
  }

  getProblemStatuses(): Observable<ProblemStatus[]> {
    return this._httpClient
      .get<ProblemStatus[]>(`${this._apiUrl}/Property/GetAllProblemStatuses`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getProblemStatus(problemStatusID: number): Observable<ProblemStatus> {
    return this._httpClient.get<ProblemStatus>(
      `${this._apiUrl}/Property/GetProblemStatus/${problemStatusID}`,
      {
        headers: this.headers,
      }
    );
  }
}
