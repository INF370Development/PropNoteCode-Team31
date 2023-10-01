export class Recovery {
  recoveryID: number = 0;
  propertyID: number = 0;
  recoveryTypeID: number = 0;
  recoveryDescription: string = "";
  recoveryAmount: number = 0;
  recoveryType?: RecoveryType = new RecoveryType();

  constructor(){
  }
}

export class RecoveryType {
  recoveryTypeID: number = 0;
  recoveryTypeDescription : string = "";

  constructor(){
  }
}

export class RecoveryRequest {
  propertyID: number = 0;
  recoveryTypeID: number = 0;
  recoveryDescription: string = "";
  recoveryAmount: number = 0;

  constructor(){
  }
}
