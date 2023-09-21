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
    private propertiesService: PropertiesService,
    private form: NgForm
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
      result.forEach(async (problem) => {
        try {
          const status = await this.propertiesService.getProblemStatus(problem.problemStatusID).toPromise();
          if (status) {
            problem.problemStatus = status;
          }
        } catch (error) {
          console.error(`Error fetching ProblemStatus for Problem ID ${problem.problemID}:`, error);
        }
      });
      this.problems = result;
      console.log("Property Result", this.problems);
    });
  }

  addProblem() {
    this.newProblem.inspectionID = this.inspectionID;
    this.propertiesService.AddProblem(this.inspectionID, this.newProblem).subscribe(
      () => {
        this.loadProblems();
        this.newProblem = new Problem();
        this.form.resetForm();
      },
      (error) => {
        console.error('Error adding problem:', error);
      }
    );
  }

  uploadProblemImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.propertiesService.uploadProblemImage(this.newProblem.problemID, formData).subscribe(
        (result) => {
          // Handle success (e.g., display a success message)
          console.log('Image uploaded successfully:', result);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  uploadProblemVideo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('video', file);
      this.propertiesService.uploadProblemVideo(this.newProblem.problemID, formData).subscribe(
        (result) => {
          // Handle success (e.g., display a success message)
          console.log('Video uploaded successfully:', result);
        },
        (error) => {
          console.error('Error uploading video:', error);
        }
      );
    }
  }

}
