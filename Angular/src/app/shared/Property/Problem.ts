import { Inspection } from "./Inspection";

export class Problem {
  problemID: number = 0;
  inspectionID: number = 0;
  problemStatusID: number = 0;
  problemSubject: string = "";
  problemDescription: string = "";
  problemDate: Date = new Date();
  problemSeverity: string = "";
  inspections: Inspection = new Inspection();
  problemStatus : ProblemStatus = new ProblemStatus();
  constructor(){
  }
}

export class ProblemStatus {
  problemStatusID: number = 0;
  problemStatusName: string = "";
  constructor(){
  }
}

export class ProblemRequest {
  inspectionID: number = 0;
  problemStatusID: number = 0;
  problemSubject: string = "";
  problemDescription: string = "";
  problemDate: Date = new Date();
  problemSeverity: string = "";
  constructor(){
  }
}

export class ProblemStatusRequest {
  problemStatusName: string = "";
  constructor(){
  }
}
