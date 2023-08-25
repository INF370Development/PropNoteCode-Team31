import { ContractorType } from "./ContractorType";
import { User } from "./User";

export class Contractor {
contractorID: number =0;
userID : number = 0;
contractorTypeID : number = 0;
areaOfBusiness : string = "";
availability : string = "";
user : User = new User();
contractorType : ContractorType = new ContractorType();
}
