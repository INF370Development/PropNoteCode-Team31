
import { ViewBrokerComponent, user } from '../view-broker.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Dialog } from '@angular/cdk/dialog';




@Component({
  selector: 'app-brokercreatemodel',
  templateUrl: './brokercreatemodel.component.html',
  styleUrls: ['./brokercreatemodel.component.scss']
})
export class BrokercreatemodelComponent {

  constructor(public dialog: MatDialogRef<BrokercreatemodelComponent>, 
    //@Inject (MAT_DIALOG_DATA) public data: DIALOGDATA,
  ){} 
}
  
    
  

  

