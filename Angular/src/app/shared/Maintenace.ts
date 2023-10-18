import { Time } from "@angular/common";
import { Contractor } from "./UserModels/Contractor";
import { MaintenanceStatus } from "./MaintenanceStatus";
import { Property } from "./Property/Property";
import { MaintenanceType } from "./MaintenanceType";
import { MaintenanceNote } from "./MaintenanceNote";

export class Maintenance{
  maintenanceID: number = 0;
  maintenanceNote: MaintenanceNote = new MaintenanceNote();
  propertyID: number=0;
  contractorID: number=0;
  maintenanceStatusID: any;
  maintenanceTypeID: number=0;
  maintenanceDate: Date = new Date();
  maintenanceTime:string = "";
  property: Property=new Property;
  contractor: Contractor =new Contractor;
  maintenanceStatus:MaintenanceStatus=new MaintenanceStatus;
  maintenanceType:MaintenanceType=new MaintenanceType;

  constructor(){
  }
}
