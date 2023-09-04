
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
  selector: 'app-view-contractor-details',
  templateUrl: './view-contractor-details.component.html',
  styleUrls: ['./view-contractor-details.component.scss']
})
export class ViewContractorDetailsComponent implements AfterViewInit{
contractorDetail : Contractor =new Contractor();
  route: any;

constructor(private _contractorService: ContractorService ) {
  console.log("Contractor details", Contractor)
}

ngAfterViewInit(): void {
this.loadContractor();
}

loadContractor() {
  // Use route.snapshot.params to get the id parameter
  const id = this.route.snapshot.params['id'];

  if (id) {
    this._contractorService.getContractorU(id).subscribe(
      (result: Contractor) => {
        this.contractorDetail = result;
        console.log("Contractor Result", result);
      },
      (error) => {
        console.error("Error loading contractor:", error);
      }
    );
  } else {
    console.error("ID parameter is undefined");
  }
}


}
