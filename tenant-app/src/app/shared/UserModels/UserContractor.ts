import { ContractorType } from "./ContractorType";

export class UserContractor {
  username : string = "";
  password : string = "";
  profilePhoto : string = "";
  email : string = "";
  name : string = "";
  surname : string = "";
  phoneNumber : string = "";
  contractorTypeID : Number = 0;
  areaOfBusiness : string = "";
  availability : string = "";
  contractorType : ContractorType = new ContractorType();
  }
