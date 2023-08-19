import { Injectable } from '@angular/core';

interface ContractorType {
    firstName : string;
    lastName : string;
    email : string;
    contact : string;
}

@Injectable({
  providedIn: 'root'
})

export class ContractorService {
  contractorDetails: any[] = [];

  constructor() { }

  public getContractor() {
    return this.contractorDetails;
  }

  public createContractor(data: ContractorType) {
    this.contractorDetails.push(data);
  }

  public editContractor(index: number, data: ContractorType) {
    this.contractorDetails[index] = data;
  }

  public deleteContractor(index: number) {
    this.contractorDetails.splice(index, 1)
  }
}
