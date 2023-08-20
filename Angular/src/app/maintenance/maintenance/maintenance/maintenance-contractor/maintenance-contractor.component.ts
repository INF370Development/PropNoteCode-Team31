import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MaintenanceContractorLine } from 'src/app/shared/MaintenanceContractorLine';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-maintenance-contractor',
  templateUrl: './maintenance-contractor.component.html',
  styleUrls: ['./maintenance-contractor.component.scss']
})
export class MaintenanceContractorComponent {
_MaintenaceContractorLine: MaintenanceContractorLine={
  maintenaceID:this.maintenanceService.MaintenanceId,
  contractorID:0
} 
  constructor(private http: HttpClient,   
    private dialogRef: MatDialogRef<MaintenanceContractorComponent>,
    private maintenanceService: MaintenanceService,
    private router: Router){
  }


  handleCheckboxChange(event: any,i: number, ListId:number) 
  {
    if (event.target.checked) {
      this.AddItemToList(i,ListId);
    } else {
      this.DeleteItemToList(i,ListId);
    }
  }
  
  public async AddItemToList(itemId:any,ListId:number)
  {
    const apiUrl = `https://localhost:7251/api/Maintenance/AddMaintenanceContractorLine`;
    await this.http.post(apiUrl,this._MaintenaceContractorLine).subscribe(
      () => {
        console.log(`Item with ID ${itemId} deleted successfully from Snag List with ID ${ListId}`);
      });
      window.location.reload();
  }
  public async DeleteItemToList(itemId:any,ListId:number)
  {

    const apiUrl = `https://localhost:7108/api/SnagList/DeleteSnagListItemLine/${ListId}?ItemId=${itemId}`;
    await this.http.delete(apiUrl).subscribe(
      () => {
        console.log(`Item with ID ${itemId} deleted successfully from Snag List with ID ${ListId}`);
      });
  }
}
