export class Broker {
  brokerID: number = 0;
  name: string = "";
  surname: string = "";
  phoneNumber: string = "";
  officeAddress: string = "";
  licenseNumber: string = "";
  commissionRate: number = 0;
  documents : Document[] =[];
}


export class Document {
  documentID: number = 0;
  contractorID: number = 0;
  documentName: string = "";
  filePath : string ="";
  uploadDate : Date = new Date();
}

