import { User } from "./User";

export class Tenant {
tenantID: Number =0;
userID : Number = 0;
companyName : string = "";
companyNumber : string = "";
user : User = new User();
}

export interface TenantApiResponse {
  tenantID: number;
  userID: number;
  companyName: string;
  companyNumber: string;
  user: {
    userID: number;
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    phoneNumber: string;
  };
}
