import { Contractor } from "./UserModels/Contractor";
import { MaintenanceStatus } from "./MaintenanceStatus";
import { Property } from "./Property/Property";
import { MaintenanceType } from "./MaintenanceType";

export class Maintenance{
  propertyID: number=0;
  contractorID: number=0;
  maintenanceStatusID: any;
  maintenanceTypeID: number=0;
  maintenanceDate: string = "";
  maintenanceTime:string = "";
  property: Property=new Property;
  contractor: Contractor =new Contractor;
  maintenanceStatus:MaintenanceStatus=new MaintenanceStatus;
  maintenanceType:MaintenanceType=new MaintenanceType;

  constructor(){
  }
}
