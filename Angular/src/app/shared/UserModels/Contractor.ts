import { ContractorType } from "./ContractorType";
import { User } from "./User";

export class Contractor {
contractorID: Number =0;
userID : Number = 0;
contractorTypeID : Number = 0;
areaOfBusiness : string = "";
availability : string = "";
user : User = new User();
contractorType : ContractorType = new ContractorType();
}
