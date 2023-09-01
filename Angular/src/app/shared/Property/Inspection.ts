export class Inspection {
  inspectionID: number = 0;
  inspectionTypeID: number = 0;
  propertyID: number = 0;
  employeeID?: number = 0;
  inspectionStatusID: number = 0;
  inspectionDescription: string = "";
  inspectionDate: Date = new Date();
  inspectionTime: string = ""; // You can use string for TimeSpan representation
  inspectionStatus: InspectionStatus = new InspectionStatus();
  inspectionType: InspectionType = new InspectionType();
}

export class InspectionStatus {
  inspectionStatusID: number = 0;
  inspectionStatusName: string = "";
}

export class InspectionType {
  inspectionTypeID: number = 0;
  inspectionTypeName: string = "";
}

export class InspectionRequest {
  propertyID: number = 0;
  inspectionDescription: string = "";
  inspectionDate: Date = new Date();
  inspectionTime: string = ""; // You can use string for TimeSpan representation
  inspectionStatusID: number = 0;
  inspectionTypeID: number = 0;
}
