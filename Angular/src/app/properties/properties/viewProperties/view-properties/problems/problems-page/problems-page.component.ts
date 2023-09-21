import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { Problem, ProblemStatus } from 'src/app/shared/Property/Problem';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-problems-page',
  templateUrl: './problems-page.component.html',
  styleUrls: ['./problems-page.component.scss'],
})
export class ProblemsPageComponent implements OnInit {
  inspectionID: number = 0;
  problems: Problem[] = [];
  newProblem: Problem = new Problem();
  problemStatuses : ProblemStatus[] =[];


  displayedColumns: string[] = ['problemSubject', 'problemDescription', 'problemSeverity', 'problemStatus'];

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.propertiesService.getProblemStatuses().subscribe((statuses) => {
      this.problemStatuses = statuses;
    });
    const inspectionIDParam = this.route.snapshot.paramMap.get('id');
    if (inspectionIDParam !== null) {
      this.inspectionID = +inspectionIDParam;
      this.loadProblems();
    } else {
      // Handle the case where 'inspectionID' is null (e.g., display an error message or redirect).
    }
  }

  loadProblems() {
    this.propertiesService.getProblemsforInspection(this.route.snapshot.params['id']).subscribe((result) => {
      // Fetch ProblemStatus data for each problem
      result.forEach(async (problem) => {
        try {
          const status = await this.propertiesService.getProblemStatus(problem.problemStatusID).toPromise();
          if (status) {
            problem.problemStatus = status; // Assign the entire ProblemStatus object to problem.problemStatus
          }
        } catch (error) {
          console.error(`Error fetching ProblemStatus for Problem ID ${problem.problemID}:`, error);
        }
      });

      // Assign the updated problems array
      this.problems = result;
      console.log("Property Result", this.problems);
    });
  }



  addProblem() {
    this.newProblem.inspectionID = this.inspectionID;
    this.propertiesService.AddProblem(this.inspectionID, this.newProblem).subscribe(
      () => {
        this.loadProblems(); // Reload problems after adding a new one
        this.newProblem = new Problem(); // Reset the new problem object
      },
      (error) => {
        console.error('Error adding problem:', error);
      }
    );
  }
}
