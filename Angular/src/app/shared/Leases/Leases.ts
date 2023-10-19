import { Property } from "../Property/Property";
import { Tenant } from "../UserModels/Tenant";

export class Lease {
  leaseID: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  monthlyAmount: number = 0;
  tenantID: number = 0;
  propertyID: number = 0;
  tenant: Tenant = new Tenant(); // Add Tenant object
  property: Property = new Property(); // Add Property object
  deposit: Deposit = new Deposit();
  showDepositInput: boolean = false;
}



// lease-request.model.ts
export class LeaseRequest {
  startDate: Date = new Date();
  endDate: Date = new Date();
  tenantID: number = 0;
  propertyID: number = 0;
  monthlyAmount: number = 0;
}

// deposit.model.ts
export class Deposit {
  depositID: number = 0;
  leaseID: number = 0;
  amount: number = 0;
}

// deposit-request.model.ts
export class DepositRequest {
  amount: number = 0;
}
