import { Component, ElementRef, ViewChild,OnInit, AfterViewInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { ViewBrokerComponent } from '../../viewBroker/view-broker/view-broker.component';
import { Broker } from 'src/app/shared/Broker';
import { BrokerService } from 'src/app/services/broker.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';

@Component({
  selector: 'app-generate-broker-report',
  templateUrl: './generate-broker-report.component.html',
  styleUrls: ['./generate-broker-report.component.scss']
})

export class GenerateBrokerReportComponent implements OnInit {
  constructor(
    private brokerService: BrokerService, private router: Router) {}

  graph() {
    this.router.navigate(['/brokerGraph']);
  }

  //PDF STUFF
  dataSource = new MatTableDataSource<Broker>();
  ngOnInit(): void {
    this.brokerService.getBrokers().subscribe((brokers: any) => {
      this.dataSource.data = brokers;
      this.fetchTableData();
    });
  }

  title ="Broker report";

  @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;

  cardData: any[] = [];

  async fetchTableData() {
    try {
      this.brokerService.getBrokers().subscribe({
        next: (response) => {
          this.cardData = response;
          console.log(this.cardData);
          //this.downloadPDF();
        },
        error: (error) => {
          console.error("Error fetching data:", error);
        }
      });
    }
    catch (error) {
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
      return averageCommissionRate.toFixed(2);
    }
    else {
      return 'No data available';
    }
  }

  downloadPDF(){
    if (this.cardData && this.cardData.length > 0) {
      const doc = new jsPDF('landscape');
      //doc.setMargins(10, 10, 10, 10); //added
      let yPos = 20;

      //HEADING
      const today = new Date();
      const formattedDate = today.toDateString();
      const reportHeading = 'Broker Report Generated on ' + formattedDate + ' \nGenerated By Admin';
      doc.setFontSize(16); //changed
      //doc.setFontStyle('bold'); //added
      doc.text(reportHeading, 10, yPos);
      yPos += 20;

      //FOOTER
      const brandingText = 'Extra Dimensions 188 Pty Ltd' //added
      doc.setFontSize(10);
      doc.setTextColor(100); //changed
      //doc.text('Extra Dimensions 188 Pty Ltd', 10, doc.internal.pageSize.height - 10);
      doc.text(brandingText, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
        align: 'center'
      }); //added

      //TABLE HEADERS
      const tableHeaders = ['Name', 'Surname', 'Phone Number', 'Office Address', 'License Number','commissionRate'];
      const colWidths = [30, 30, 40, 60, 40, 35];
      doc.setFontSize(12);
      doc.setFillColor(105, 240, 174); // Header background color  rgb(105,240,174)
      doc.setTextColor(0); //changed
      doc.setFont('bold');
      doc.rect(10, yPos, colWidths.reduce((a, b) => a + b), 10, 'F');
      let xPos = 10;
      for (let i = 0; i < tableHeaders.length; i++) {
        doc.text(tableHeaders[i], xPos + 2, yPos + 8);
        xPos += colWidths[i];
      }
      yPos += 10;

      //TOTAL BROKERS
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
        doc.text(`Total Brokers: ${totalBrokers}`, 20, doc.internal.pageSize.getHeight() - 20, {
          align: 'left'
        }); //added

          /*doc.text(`Total Brokers: ${totalBrokers}`, totalBrokersX, totalBrokersY, {
            align: 'left'
          });*/


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
        doc.text(`Average Commission Rate: ${averageCommissionRate}`, 20, doc.internal.pageSize.getHeight() - 15, {
          align: 'left'
        }); //added
      }
      else {
        console.error("No data available to generate PDF.");
      }

      //  table data
      doc.setFont('normal');

      //Adding to different rows:
      let isOddRow = false; // Initialize as even row

      this.cardData.forEach(Broker => {
      xPos = 10;

      isOddRow = !isOddRow;

      for (let i = 0; i < tableHeaders.length; i++) {
        const headerKey = tableHeaders[i];
        let cellContent = this.getCellContent(Broker, headerKey);
        if (cellContent.length > colWidths[i] / 3) {
          cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
      }

      // Set row color based on odd/even
      const rowColor = isOddRow ? [255, 255, 255] : [240, 240, 240];

      // Draw cell with borders and background color
      doc.setFillColor(rowColor[0], rowColor[1], rowColor[2]);
      doc.rect(xPos, yPos, colWidths[i], 10, 'F'); // Add a filled rectangle as the cell background
      doc.setTextColor(0); // Set text color to black
      doc.text(cellContent, xPos + 2, yPos + 8);

      xPos += colWidths[i];
    }
      yPos += 10;
    });

      /*this.cardData.forEach(Broker => {
       xPos = 10;

        for (let i = 0; i < tableHeaders.length; i++) {
          const headerKey = tableHeaders[i];
          let cellContent = this.getCellContent(Broker, headerKey);
          if (cellContent.length > colWidths[i] / 3) {
            cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
          } //added


          console.log(`cellContent: ${cellContent}, xPos: ${xPos}, yPos: ${yPos}`);
          doc.setTextColor(0);
          //doc.text(cellContent, xPos, yPos + 8);
          doc.text(cellContent, xPos + (typeof cellContent === 'number' ? colWidths[i] - 5 : 5), yPos + 8);
          xPos += colWidths[i];
        }
        yPos += 10;
      });*/

      doc.save('Broker_Report.pdf');
      }
      else {
        console.error("No data to generate PDF.");
      }
  }

  getCellContent(broker: any, headerKey: any): any {
    switch (headerKey) {
      case 'Name':
        return broker.name;
       case 'Surname':
        return broker.surname;
      case 'Phone Number':
        return broker.phoneNumber;
      case 'Office Address':
        return broker.officeAddress;
      case 'License Number':
        return broker.licenseNumber;
      case 'Commisson Rate':
        return broker.commissionRate;
      default:
        return broker[headerKey] !== undefined && broker[headerKey] !== null
            ? broker[headerKey].toString()
            : '';
    }
  }
}
