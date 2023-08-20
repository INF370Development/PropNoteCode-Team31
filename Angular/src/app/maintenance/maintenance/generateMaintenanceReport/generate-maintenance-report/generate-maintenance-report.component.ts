import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generate-maintenance-report',
  templateUrl: './generate-maintenance-report.component.html',
  styleUrls: ['./generate-maintenance-report.component.scss']
})
export class GenerateMaintenanceReportComponent {

}




  /*dataSource = new MatTableDataSource<Broker>();
  ngOnInit(): void {
    this.brokerService.getBrokers().subscribe((brokers: any) => {
      this.dataSource.data = brokers;
      this.fetchTableData();
    });
  }
title ="Broker report";


constructor(
 
  private brokerService: BrokerService,
  ){}

   @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;
  cardData: any[] = [];
  async fetchTableData() {
    try {
      this.brokerService.getBrokers().subscribe({
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

   
    if (this.cardData && this.cardData.length > 0) {
      const doc = new jsPDF('landscape'); // Set landscape orientation
      let yPos = 20;
  
      // heading with date
      const today = new Date();
      const formattedDate = today.toDateString();
      doc.setFontSize(18);
      doc.text('Broker Report - ' + formattedDate, 10, yPos);
      yPos += 15;
       //  table headers
       const tableHeaders = ['name', 'surname', 'phoneNumber', 'officeAddress', 'licenseNumber','commissionRate'];
       const colWidths = [30, 30, 40, 60, 40, 30,20];
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
       
       this.cardData.forEach(Broker => {
         xPos = 10;
        
         for (let i = 0; i < tableHeaders.length; i++) {
           const headerKey = tableHeaders[i];
           let cellContent = this.getCellContent(Broker, headerKey);
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
      
      doc.save('Broker_Report.pdf');
    } else {
      console.error("No data to generate PDF.");
    }
  }
  
  getCellContent(broker: any, headerKey: any): any {
    switch (headerKey) {
      case 'name':
        return broker.name;
       case 'surname':
        return broker.surname;
      case 'phoneNumber':
        return broker.phoneNumber;
      case 'officeAddress':
        return broker.officeAddress; 
      case 'licenseNumber':
        return broker.licenseNumber;
      case 'commissonRate':
        return broker.commissionRate;
      default:
        return broker[headerKey] !== undefined && broker[headerKey] !== null
            ? broker[headerKey].toString()
            : '';
    }
  }
       
  }*/