import { Time } from "@angular/common";
import { Contractor } from "./UserModels/Contractor";
import { MaintenanceStatus } from "./MaintenanceStatus";
import { Property } from "./Property/Property";
import { MaintenanceType } from "./MaintenanceType";
import { MaintenanceNote } from "./MaintenanceNote";

export class Maintenance {
  maintenanceID: number = 0;
  maintenanceNote: MaintenanceNote = new MaintenanceNote();
  maintenanceDate: Date = new Date();
  maintenanceTime : string = "";
  maintenanceTypeID : number = 0;
  propertyID: number = 0;
  property: Property = new Property();
  contractorID: number = 0;
  contractor: Contractor = new Contractor();
  constructor() {}
}
