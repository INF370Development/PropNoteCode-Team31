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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  apiUrl = 'https://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this._httpClient
      .get<Property[]>(`https://localhost:7251/api/Property/GetAllProperties`)
      .pipe(map((result) => result));
  }
  getInspections(): Observable<Inspection[]> {
    return this._httpClient
      .get<Inspection[]>(
        `https://localhost:7251/api/Property/GetAllInspections`
      )
      .pipe(map((result) => result));
  }

  updateInspection(inspection: Inspection): Observable<any> {
    const url = `https://localhost:7251/api/Property/EditInspection/${inspection.inspectionID}`;
    return this._httpClient.put(url, inspection);
  }

  deleteInspection(inspectionID: number): Observable<any> {
    return this._httpClient.delete(
      `https://localhost:7251/api/Property/DeleteInspection/${inspectionID}`
    );
  }

  getInspectionTypes(): Observable<InspectionType[]> {
    return this._httpClient
      .get<InspectionType[]>(
        `https://localhost:7251/api/Property/GetAllInspectionTypes`
      )
      .pipe(map((result) => result));
  }

  getInspectionStatuses(): Observable<InspectionStatus[]> {
    return this._httpClient
      .get<InspectionStatus[]>(
        `https://localhost:7251/api/Property/GetAllInspectionStatuses`
      )
      .pipe(map((result) => result));
  }

  getRecoveries(): Observable<Recovery[]> {
    return this._httpClient
      .get<Recovery[]>(`https://localhost:7251/api/Property/GetAllRecoveries`)
      .pipe(map((result) => result));
  }

  updateRecovery(recovery: Recovery): Observable<any> {
    const url = `https://localhost:7251/api/Property/EditRecovery/${recovery.recoveryID}`;
    return this._httpClient.put(url, recovery);
  }

  deleteRecovery(recoveryID: number): Observable<any> {
    return this._httpClient.delete(
      `https://localhost:7251/api/Property/DeleteRecovery/${recoveryID}`
    );
  }

  getRecoveryTypes(): Observable<RecoveryType[]> {
    return this._httpClient
      .get<RecoveryType[]>(
        `https://localhost:7251/api/Property/GetAllRecoveryTypes`
      )
      .pipe(map((result) => result));
  }

  getInspectionsForProperty(propertyID: number): Observable<Inspection[]> {
    return this._httpClient.get<Inspection[]>(
      `https://localhost:7251/api/Property/GetAllInspectionsForProperty/${propertyID}`
    );
  }

  getRecoveriesForProperty(propertyID: number): Observable<Recovery[]> {
    return this._httpClient.get<Recovery[]>(
      `https://localhost:7251/api/Property/GetAllRecoveriesForProperty/${propertyID}`
    );
  }

  getProperty(propertyID: number) {
    return this._httpClient.get<Property>(
      `https://localhost:7251/api/Property/GetPropertyByID` + '/' + propertyID
    );
  }

  deleteProperty(propertyID: number) {
    return this._httpClient
      .delete(
        `https://localhost:7251/api/Property/DeleteProperty` + '/' + propertyID
      )
      .pipe(map((result) => result));
  }

  CreateProperty(property: Property) {
    return this._httpClient
      .post(`https://localhost:7251/api/Property/AddProperty`, property)
      .pipe(map((result) => result));
  }

  uploadPropertyImage(
    propertyId: number,
    imageFormData: FormData
  ): Observable<any> {
    return this._httpClient.post(
      `https://localhost:7251/api/Property/uploadPhoto/${propertyId}`,
      imageFormData
    );
  }

  getPropertyImagesByPropertyID(
    propertyID: number
  ): Observable<PropertyImage[]> {
    const url = `https://localhost:7251/api/Property/GetPropertyImagesByPropertyID/${propertyID}`;
    return this._httpClient.get<PropertyImage[]>(url);
  }

  addInspection(propertyID: number, inspection: Inspection) {
    return this._httpClient
      .post(
        `https://localhost:7251/api/Property/AddInspection/${propertyID}`,
        inspection
      )
      .pipe(map((result) => result));
  }

  AddRecovery(propertyID: number, recovery: Recovery) {
    return this._httpClient
      .post(
        `https://localhost:7251/api/Property/AddRecovery/${propertyID}`,
        recovery
      )
      .pipe(map((result) => result));
  }

  addRecoveryType(newRecoveryType: RecoveryType): Observable<RecoveryType> {
    const url = `https://localhost:7251/api/Property/AddRecoveryType`;

    return this._httpClient.post<RecoveryType>(url, newRecoveryType);
  }

  addInspectionType(newInspectionType: InspectionType): Observable<InspectionType> {
    const url = `https://localhost:7251/api/Property/AddInspectionType`;

    return this._httpClient.post<InspectionType>(url, newInspectionType);
  }

  AddProblem(inspectionID: number, problem: Problem) {
    return this._httpClient
      .post(
        `https://localhost:7251/api/Property/AddProblem/${inspectionID}`,
        problem
      )
      .pipe(map((result) => result));
  }

  getProblemsforInspection(inspectionID: number): Observable<Problem[]> {
    return this._httpClient.get<Problem[]>(
      `https://localhost:7251/api/Property/GetAllProblemsForInspection/${inspectionID}`
    );
  }

  getProblemStatuses(): Observable<ProblemStatus[]> {
    return this._httpClient
      .get<ProblemStatus[]>(
        `https://localhost:7251/api/Property/GetAllProblemStatuses`
      )
      .pipe(map((result) => result));
  }

  getProblemStatus(problemStatusID: number): Observable<ProblemStatus> {
    return this._httpClient.get<ProblemStatus>(
      `https://localhost:7251/api/Property/GetProblemStatus/${problemStatusID}`
    );
  }

  uploadProblemImage(problemId: number, imageFormData: FormData): Observable<any> {
    return this._httpClient.post(
      `https://localhost:7251/api/Property/uploadProblemPhoto/${problemId}`,
      imageFormData
    );
  }

  uploadProblemVideo(
    problemId: number,
    videoFormData: FormData
  ): Observable<any> {
    return this._httpClient.post(
      `https://localhost:7251/api/Property/uploadProblemVideo/${problemId}`,
      videoFormData
    );
  }

  updateProblem(problemID: number, updateProblem: Problem): Observable<any> {
    const url = `https://localhost:7251/api/Property/EditProblem/${problemID}`;
    return this._httpClient.put(url, updateProblem);
  }

  getProblemImages(problemID: number): Observable<any[]> {
    return this._httpClient.get<any[]>(`https://localhost:7251/api/Property/GetProblemImages/${problemID}`);
  }

  getProblemVideos(problemID: number): Observable<any[]> {
    return this._httpClient.get<any[]>(`https://localhost:7251/api/Property/GetProblemVideos/${problemID}`);
  }

  deleteProblem(problemID: number): Observable<any> {
    const url = `https://localhost:7251/api/Property/DeleteProblem/${problemID}`;
    return this._httpClient.delete(url, {responseType: 'text'});
  }

}



