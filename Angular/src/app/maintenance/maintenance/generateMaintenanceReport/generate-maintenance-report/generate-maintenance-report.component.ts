import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
  import jsPDF, { jsPDFAPI } from 'jspdf';
  import { ViewMaintenanceComponent } from '../../maintenance/maintenance.component';
  import { Maintenance } from 'src/app/shared/Maintenace';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { AddMaintenanceComponent } from '../../maintenance/add-maintenance/add-maintenance.component';
  import { MatTableDataSource } from '@angular/material/table';
  
  
  @Component({
    selector: 'app-generate-maintenance-report',
    templateUrl: './generate-maintenance-report.component.html',
    styleUrls: ['./generate-maintenance-report.component.scss']
  })
  export class GenerateMaintenanceReportComponent implements OnInit {
  
  
    dataSource = new MatTableDataSource<Maintenance>();
    ngOnInit(): void {
      this.maintenanceService.getMaintenances().subscribe((maintenances: any) => {
        this.dataSource.data = maintenances;
        this.fetchTableData();
      });
    }
  title ="Maintenance report";
  
  
  constructor(
   
    private maintenanceService: MaintenanceService,
    ){}
  
     @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;
    cardData: any[] = [];
    async fetchTableData() {
      try {
        this.maintenanceService.getMaintenances().subscribe({
          next: (response) => {
            this.cardData = response;
            console.log(this.cardData); // Check if data is fetched correctly
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
  
     
      if (this.cardData && this.cardData.length >= 0) {
        const doc = new jsPDF('landscape'); // Set landscape orientation
        let yPos = 20;
    
        // heading with date
        const today = new Date();
        const formattedDate = today.toDateString();
        doc.setFontSize(18);
        doc.text('Maintenance Report - ' + formattedDate, 10, yPos);
        yPos += 15;
         //  table headers
         const tableHeaders = ['Property', 'Employee','Contractor', 'MaintenanceStatus', 'MaintenanceType', 'Date'];
         const colWidths = [30, 30, 40, 30, 40, 30,20];
         doc.setFontSize(12);
         
         doc.setFillColor(105, 240, 174); // Header background color  rgb(105,240,174)
         doc.setTextColor(0); // Header text color
         doc.setFont('bold');
         doc.rect(10, yPos, colWidths.reduce((a, b) => a + b), 10, 'F');
         let xPos = 10;
         for (let i = 0; i < tableHeaders.length; i++) {
           doc.text(tableHeaders[i], xPos + 2, yPos + 8);
           xPos += colWidths[i];
         }
         yPos += 10;
    
         //  table data
         doc.setFont('normal');
         
         this.cardData.forEach(Maintenance => {
           xPos = 10;
          
           for (let i = 0; i < tableHeaders.length; i++) {
             const headerKey = tableHeaders[i];
             let cellContent = this.getCellContent(Maintenance, headerKey);
             if (cellContent.length > colWidths[i] / 3) {
                          cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
                        }
     
     
             console.log(`cellContent: ${cellContent}, xPos: ${xPos}, yPos: ${yPos}`);
             doc.setTextColor(0);
             doc.text(cellContent, xPos, yPos + 8);
             xPos += colWidths[i];
           }
            // Move to the next row
          yPos += 10;
        
        });
        
        doc.save('Maintenance_Report.pdf');
      } else {
        console.error("No data to generate PDF.");
      }
    }
    
    getCellContent(Maintenance: any, headerKey: any): any {
      switch (headerKey) {
        case 'Property':
          return Maintenance.propertyID.toString();
        case 'Employee':
          return Maintenance.employeeID.toString();
        case 'Contractor':
          return Maintenance.contractorID.toString();
        case 'MaintenanceStatus':
          return Maintenance.maintenanceStatusID.toString();
        case 'MaintenanceType':
          return Maintenance.maintenanceTypeID.toString();
        case 'Date':
          return Maintenance.maintenanceDate ? Maintenance.maintenanceDate.toDateString() : '';
        case 'Time':
          return Maintenance.maintenanceTime;
        default:
          return Maintenance[headerKey] !== undefined && Maintenance[headerKey] !== null
              ? Maintenance[headerKey].toString()
              : '';
      }
    }
    
         
    }