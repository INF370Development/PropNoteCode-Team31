import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractorType } from 'src/app/shared/UserModels/ContractorType';
import { ContractorTypeService } from 'src/app/services/contractorType.service';

NgModule({
  imports: [
  MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
});

@Component({
  selector: 'app-contractor-details',
  templateUrl: './contractor-details.component.html',
  styleUrls: ['./contractor-details.component.scss']
})

export class ContractorDetailsComponent implements AfterViewInit {
  contractorDetail: Contractor = new Contractor();

  constructor(public dialog: MatDialog, private _contractorService: ContractorService, private route:ActivatedRoute) {
    console.log("contractor details", Contractor)
  }

  ngAfterViewInit(): void {
    this.loadContractor();
  }

  loadContractor()
  {
    this._contractorService.getContractor(this.route.snapshot.params['id']).subscribe((result) =>
    {
      this.contractorDetail = result
      console.log("Contractor Result", result)
    });
  }
}