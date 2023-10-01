import { Property } from "./Property/Property";
import { Contractor } from "./UserModels/Contractor";

export class Maintenance {
    id : number = 0;
    maintenanceNote : string = "";
    status : string = "";
    propertyID: Number = 0;
    property: Property = new Property();
    contractorID: Number = 0;
    contractor: Contractor = new Contractor();

    constructor(){}
}
