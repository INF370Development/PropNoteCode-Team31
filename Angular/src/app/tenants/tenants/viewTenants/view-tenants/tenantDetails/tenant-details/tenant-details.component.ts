import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { TenantService } from 'src/app/services/tenant.service';

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
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.scss']
})

export class TenantDetailsComponent implements AfterViewInit {

  tenantDetail : Tenant = new Tenant();
  //tenantDetail: Tenant[] = [];

  constructor(
    public dialog: MatDialog, 
    private _tenantService: TenantService, 
    private route:ActivatedRoute) {
    console.log("tenant details", Tenant)
  }

  ngAfterViewInit(): void {
    //this.loadTenant();
  }

  /*loadTenant() {
    this._tenantService.getTenants(this.route.snapshot.params['id']).subscribe((result) => {
      this.tenantDetail = result;
      console.log("Broker Result", result);
    });
  }*/
}