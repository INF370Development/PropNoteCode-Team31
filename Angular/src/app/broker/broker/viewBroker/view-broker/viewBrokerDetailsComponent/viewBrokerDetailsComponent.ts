import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Broker } from 'src/app/shared/Broker';
import { BrokerService } from 'src/app/services/broker.service';

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
  selector: 'app-viewBrokerDetails',
  templateUrl: './viewBrokerDetailsComponent.html',
  styleUrls: ['./viewBrokerDetailsComponent.scss'],
})
export class ViewBrokerDetailsComponent implements AfterViewInit {
  brokerDetail : Broker = new Broker();

  constructor(public dialog: MatDialog, private _brokerService: BrokerService, private route:ActivatedRoute) {
    console.log("broker details", Broker)
  }

  ngAfterViewInit(): void {
this.loadBroker();
}

loadBroker()
{
  this._brokerService.getBroker(this.route.snapshot.params['id']).subscribe((result) =>
  {
    this.brokerDetail = result
    console.log("Broker Result", result)
  });

}

}
