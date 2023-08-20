import { Time } from "@angular/common";

export interface Maintenance{
  propertyID: number;
  employeeID: number;
  contractorID: number;
  maintenanceStatusID: number;
  maintenanceTypeID: number;
  maintenanceDate: Date;
  maintenanceTime:Date;
}
