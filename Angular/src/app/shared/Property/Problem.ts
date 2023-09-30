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
  problemVideos : ProblemVideo[] = [];
  problemImages : ProblemImage[] = [];
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

export class ProblemImage {
  problemImageID: number = 0;
  imageName: string = "";
  imageData: string = ""; // You might want to use the appropriate data type for binary data
  problemID: number = 0;

  constructor() {}
}

export class ProblemVideo {
  problemVideoID: number = 0;
  problemID: number = 0;
  fileName: string = "";
  contentType: string = "";
  videoURL: string = "";
  problem: Problem = new Problem();

  constructor() {}
}


