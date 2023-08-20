import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { ViewTenantsComponent } from '../../viewTenants/view-tenants/view-tenants.component';
import { Tenant } from 'src/app/shared/Tenant';
import { TenantService } from './../../../../services/tenant.service';
import { CreateTenantModalComponent } from '../../viewTenants/view-tenants/createTenantModal/create-tenant-modal/create-tenant-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generate-tenants-report',
  templateUrl: './generate-tenants-report.component.html',
  styleUrls: ['./generate-tenants-report.component.scss']
})

export class GenerateTenantsReportComponent implements OnInit{

  dataSource = new MatTableDataSource<Tenant>();

  /*ngOnInit(): void {
    this.tenantService.getTenants().subscribe((tenants: any) => {
      this.dataSource.data = tenants;
      this.fetchTableData();
    });
  }*/

  ngOnInit(): void {
    this.tenantService.getTenants().subscribe((tenants: any) => {
      console.log('Fetched tenants:', tenants); 
      this.dataSource.data = tenants;
      this.downloadPDF();
    });
  }

title ="Tenant report";

constructor(
 
  private tenantService: TenantService,
  ){}

  @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;

  cardData: any[] = [];

  async fetchTableData() {
    try {
      this.tenantService.getTenants().subscribe({
        next: (response) => {
          this.cardData = response;
          console.log(this.cardData);
          this.downloadPDF();
        },
        error: (error) => {
          console.error("Error fetching data:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  downloadPDF(){

    console.log('Data for PDF:', this.cardData); 

    if (this.cardData && this.cardData.length > 0) {
      const doc = new jsPDF('landscape'); 
      let yPos = 20;
  
      const today = new Date();
      const formattedDate = today.toDateString();
      doc.setFontSize(18);
      doc.text('Tenant Report - ' + formattedDate, 10, yPos);
      yPos += 15;

       const tableHeaders = ['Email','First Name', 'Surname', 'Job Title'];
       const colWidths = [30, 30, 40, 60, 40];
       doc.setFontSize(12);
       
       doc.setFillColor(105, 240, 174); 
       doc.setTextColor(0); 
       doc.setFont('bold');
       doc.rect(10, yPos, colWidths.reduce((a, b) => a + b), 10, 'F');
       let xPos = 10;
       for (let i = 0; i < tableHeaders.length; i++) {
         doc.text(tableHeaders[i], xPos + 2, yPos + 8);
         xPos += colWidths[i];
       }
       yPos += 10;
  
       doc.setFont('normal');
       
       this.cardData.forEach(Tenant => {
         xPos = 10;
        
         for (let i = 0; i < tableHeaders.length; i++) {
           const headerKey = tableHeaders[i];
           let cellContent = this.getCellContent(Tenant, headerKey);
           if (cellContent.length > colWidths[i] / 3) {
                        cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
                      }
   
   
           console.log(`cellContent: ${cellContent}, xPos: ${xPos}, yPos: ${yPos}`);
           doc.setTextColor(0);
           doc.text(cellContent, xPos, yPos + 8);
           xPos += colWidths[i];
         }

        yPos += 10;
      
      });
      
      doc.save('Tenant_Report.pdf');
    } else {
      console.error("No data to generate PDF.");
    }
  }
  
  getCellContent(tenant: any, headerKey: any): any {
    switch (headerKey) {
      case 'email':
        return tenant.email;
       case 'firstname':
        return tenant.firstname;
      case 'surname':
        return tenant.surname;
      case 'jobtitle':
        return tenant.jobtitle; 
      default:
        return tenant[headerKey] !== undefined && tenant[headerKey] !== null
            ? tenant[headerKey].toString()
            : '';
    }
  }  
}