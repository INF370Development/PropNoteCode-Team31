
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractorServiceService } from '../viewContractors/view-contractors/contractor-service.service';

@Component({
  selector: 'app-addcontractor',
  templateUrl: './addcontractor.component.html',
  styleUrls: ['./addcontractor.component.scss']
})
export class AddcontractorComponent implements OnInit {

  addContractorForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddcontractorComponent>, 
    public ContractorServiceService: ContractorServiceService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public incomingData: any
  ) { }

  ngOnInit(): void {
    this.addContractorForm = new FormGroup({  
        id: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required)
    })
    this.addContractorForm.patchValue(this.incomingData);
  }

  public closePopup() {
    this.dialogRef.close();
    this.addContractorForm.reset();
  }

  public addContractor() {
    if (this.incomingData && this.incomingData.action && this.incomingData.action === 'edit') {
      this.ContractorServiceService.editUser(this.incomingData.id, this.addContractorForm.value);
      this.dialogRef.close();
    } else {
      this.ContractorServiceService.addUser(this.addContractorForm.value);
      this.dialogRef.close();
    }
  }

  public deleteContractor() {
    this.dialogRef.close(true);
  }

  public cancelDelete() {
    this.dialogRef.close(false);
  }
}

