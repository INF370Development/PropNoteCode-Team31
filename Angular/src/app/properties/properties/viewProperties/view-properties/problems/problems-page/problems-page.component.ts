import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { Problem, ProblemStatus, ProblemVideo } from 'src/app/shared/Property/Problem';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  showPhotoUpload: boolean = false;
  showVideoUpload: boolean = false;
  problemImages: any[] = [];
  problemVideos: any[] = [];


  displayedColumns: string[] = ['problemSubject', 'problemDescription', 'problemSeverity', 'problemStatus','actions', 'delete'];

  selectedPhoto: File | null = null;
  selectedVideo: File | null = null;

  isEditMode: boolean = false;
  editedProblem: Problem | null = null;

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
      if (result && result.length > 0) {
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
      } else {
        // Handle the case where there are no problems (e.g., display a message).
        console.log("No problems found for inspection ID:", this.inspectionID);
      }
    }, (error) => {
      // Handle the error from the HTTP request
      console.error('Error loading problems:', error);
      // You can also display an error message to the user if needed.
    });
  }

  editProblem(problem: Problem) {
    // Set the problem to edit and enter edit mode
    this.editedProblem = problem;
    this.isEditMode = true;

    this.newProblem.problemSubject = problem.problemSubject;
    this.newProblem.problemDescription = problem.problemDescription;
    this.newProblem.problemSeverity = problem.problemSeverity;
    this.newProblem.problemStatusID = problem.problemStatusID;

    // Populate form fields with the data of the problem to edit
    this.newProblem = { ...problem }; // Assuming newProblem has the same structure as Problem

    this.loadProblemImages(problem.problemID);
    this.loadProblemVideos(problem.problemID);
  }

  updateProblem() {
  if (this.editedProblem) {
    this.propertiesService.updateProblem(this.editedProblem.problemID, this.newProblem)
      .subscribe(
        (updatedProblem) => {
          // Handle success
          console.log('Problem updated successfully:', updatedProblem);
          this.isEditMode = false; // Exit edit mode

          // Upload new photo and video if selected
          this.uploadNewMedia(updatedProblem.problemID);

          // Reset the new problem object
          this.newProblem = new Problem();

          this.selectedPhoto = null;
          this.selectedVideo = null;
          this.showPhotoUpload = false;
          this.showVideoUpload = false;
        },
        (error) => {
          console.error('Error updating problem:', error);

          // Log the specific error message and response details
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Response:', error.error);
          }
        }
      );
  }
}

uploadNewMedia(problemID: number) {
  if (this.selectedPhoto) {
    const formData = new FormData();
    formData.append('photo', this.selectedPhoto, this.selectedPhoto.name);

    this.propertiesService.uploadProblemImage(problemID, formData).subscribe(
      () => {
        // Success: Reload problems after adding a new one
        this.loadProblems();
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  if (this.selectedVideo) {
    const formData = new FormData();
    formData.append('video', this.selectedVideo, this.selectedVideo.name);

    this.propertiesService.uploadProblemVideo(problemID, formData).subscribe(
      () => {
        // Success: Reload problems after adding a new one
        this.loadProblems();
      },
      (error) => {
        console.error('Error uploading video:', error);
      }
    );
  }
}

deleteProblem(problem: Problem) {
  if (confirm('Are you sure you want to delete this problem as well as all the media attached to it?')) {
    this.propertiesService.deleteProblem(problem.problemID).subscribe(
      () => {
        // Handle success, e.g., remove the problem from the list
        const index = this.problems.indexOf(problem);
        if (index !== -1) {
          this.problems.splice(index, 1);
        }
        console.log('Problem deleted successfully.');
        this.loadProblems();
      },
      (error) => {
        console.error('Error deleting problem:', error);

        // Log the specific error message and response details
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response:', error.error);
        }
      }
    );
  }
}

addProblem() {
  this.newProblem.inspectionID = this.inspectionID;

  // Add the new problem first
  this.propertiesService.AddProblem(this.inspectionID, this.newProblem).subscribe(
    (addedProblem) => {
      // Use a type assertion to specify the type of addedProblem
      const typedAddedProblem = addedProblem as Problem;

      // Extract the problemID from the added problem
      this.newProblem.problemID = typedAddedProblem.problemID;

      // Upload new media only after the problem has been added
      this.uploadNewMedia(this.newProblem.problemID);

      // Add the new problem to the list
      this.problems.push(this.newProblem);

      // Reset form and other variables
      console.log("Problems:", this.problems);
      this.newProblem = new Problem();
      this.selectedPhoto = null;
      this.selectedVideo = null;
      this.showPhotoUpload = false;
      this.showVideoUpload = false;

    },
    (error) => {
      console.error('Error adding problem:', error);
    }
  )

  this.loadProblems();
}

closeEditMode() {
  this.isEditMode = false;
  this.newProblem = new Problem();
  // Reset the form or perform any other necessary actions when exiting edit mode.
}

  uploadProblemImage() {
    if (this.selectedPhoto) {
      const formData = new FormData();
      formData.append('photo', this.selectedPhoto);

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

  uploadProblemVideo() {
    if (this.selectedVideo) {
      const formData = new FormData();
      formData.append('video', this.selectedVideo);
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

  onPhotoInputChange(event: any) {
    this.selectedPhoto = event.target.files[0];
  }

  onVideoInputChange(event: any) {
    this.selectedVideo = event.target.files[0];
  }

  togglePhotoUpload(event: Event) {
    event.preventDefault(); // Prevent form submission
    this.showPhotoUpload = !this.showPhotoUpload;
    if (this.showPhotoUpload) {
      // Optionally add validation or other logic when showing the photo upload section
    }
  }

  toggleVideoUpload(event: Event) {
    event.preventDefault(); // Prevent form submission
    this.showVideoUpload = !this.showVideoUpload;
    if (this.showVideoUpload) {
      // Optionally add validation or other logic when showing the video upload section
    }
  }

  loadProblemImages(problemID: number): void {
    this.propertiesService.getProblemImages(problemID).subscribe(
      (images) => {
        this.problemImages = images;
      },
      (error) => {
        console.error('Error loading problem images:', error);
      }
    );
  }

  loadProblemVideos(problemID: number): void {
    this.propertiesService.getProblemVideos(problemID).subscribe(
      (videos) => {
        this.problemVideos = videos;
      },
      (error) => {
        console.error('Error loading problem videos:', error);
      }
    );
  }

  getImageUrl(imageData: string): string {
    if (!imageData || imageData.length === 0) {
      return ''; // Return an empty string or placeholder URL
    }

    return `data:image/jpeg;base64,${imageData}`;
    }
}
