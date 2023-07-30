
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrokerService } from '../broker.service';



@Component({
  selector: 'app-brokercreatemodel',
  templateUrl: './brokercreatemodel.component.html',
  styleUrls: ['./brokercreatemodel.component.scss']
})
export class BrokercreatemodelComponent {

  addUserForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<BrokercreatemodelComponent>, 
    public BrokerService: BrokerService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public incomingData: any
  ){} 


  ngOnInit(): void {
    this.addUserForm = new FormGroup({  
        id: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required)
    })
    this.addUserForm.patchValue(this.incomingData);
  }

  public closePopup() {
    this.dialogRef.close();
    this.addUserForm.reset();
  }

  public addUser() {
    if (this.incomingData && this.incomingData.action && this.incomingData.action === 'edit') {
      this.BrokerService.editUser(this.incomingData.id, this.addUserForm.value);
      this.dialogRef.close();
    } else {
      this.BrokerService.addUser(this.addUserForm.value);
      this.dialogRef.close();
    }
  }

  public deleteUser() {
    this.dialogRef.close(true);
  }

  public cancelDelete() {
    this.dialogRef.close(false);
  }
}
  
    
  

  

