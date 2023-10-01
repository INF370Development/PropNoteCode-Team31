import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { ViewBrokerComponent } from '../../viewBroker/view-broker/view-broker.component';
import { Broker } from 'src/app/shared/Broker';
import { BrokerService } from 'src/app/services/broker.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-generate-broker-report',
  templateUrl: './generate-broker-report.component.html',
  styleUrls: ['./generate-broker-report.component.scss']
})
export class GenerateBrokerReportComponent implements OnInit {


  dataSource = new MatTableDataSource<Broker>();
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
          //this.downloadPDF();
        },
        error: (error) => {
          console.error("Error fetching data:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

calculateAverageCommissionRate(): string {
 if (this.cardData && this.cardData.length > 0) {
   const totalBrokers = this.cardData.length;
   let totalCommissionRate = 0;

   for (const broker of this.cardData) {
     if (broker.commissionRate) {
       totalCommissionRate += parseFloat(broker.commissionRate);
     }
   }

   const averageCommissionRate = totalCommissionRate / totalBrokers;
   return averageCommissionRate.toFixed(2); // Return the average commission rate rounded to 2 decimal places
 } else {
   return 'N/A'; // No data available
 }
}


  downloadPDF(){


    if (this.cardData && this.cardData.length > 0) {
      const doc = new jsPDF('landscape'); // Set landscape orientation
      let yPos = 20;

      // heading with date
      const today = new Date();
      const formattedDate = today.toDateString();
      const reportHeading = 'Broker Report Generated on ' + formattedDate + ' \nGenerated By Admin';
      doc.setFontSize(18);
      doc.text(reportHeading, 10, yPos);
      yPos += 30; // Increase yPos to create more space for the multiline heading

      // Add branding text to the footer
  doc.setFontSize(10); // Set font size for branding text
  doc.setTextColor(0); // Set text color
  doc.text('Extra Dimensions 188 Pty Ltd', 10, doc.internal.pageSize.height - 10);

       //  table headers
       const tableHeaders = ['name', 'surname', 'phoneNumber', 'officeAddress', 'licenseNumber','commissionRate'];
       const colWidths = [30, 30, 40, 60, 40, 30,30,20];
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

      //Adding total brokers
        if (this.cardData && this.cardData.length > 0) {
         const totalBrokers = this.cardData.length;

          // Calculate the content width of the table
          const totalWidth = colWidths.reduce((total, width) => total + width, 0);

          // Calculate the position for the total brokers
          const totalBrokersX = 10; // X position (left)
          const totalBrokersY = doc.internal.pageSize.height - 20; // Y position (bottom)

          // Set the font size and color for the total brokers
          doc.setFontSize(10);
          doc.setTextColor(0);

          // Draw the total brokers text
          doc.text(`Total Brokers: ${totalBrokers}`, totalBrokersX, totalBrokersY, {
            align: 'left'
          });


           //avg broker commisson
           // Calculate the average commission rate
          const averageCommissionRate = this.calculateAverageCommissionRate();

          //positioning rate at bottomleft
          // Calculate the position for the average commission rate
          const averageCommissionX = 10; // X position (left)
          const averageCommissionY = doc.internal.pageSize.height - 15; // Y position (bottom)

          // Set the font size and color for the average commission rate
          doc.setFontSize(10);
          doc.setTextColor(0);

          // Draw the average commission rate text
          doc.text(`Average Commission Rate: ${averageCommissionRate}`, averageCommissionX, averageCommissionY, {
            align: 'left'
          });

      } else {
        console.error("No data available to generate PDF.");
       }



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

  }



