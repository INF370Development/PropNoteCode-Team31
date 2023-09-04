import { Lease } from "../Leases/Leases";
import { User } from "./User";

export class Tenant {
tenantID: number =0;
userID : Number = 0;
companyName : string = "";
companyNumber : string = "";
user : User = new User();
leases : Lease[] = []
}

