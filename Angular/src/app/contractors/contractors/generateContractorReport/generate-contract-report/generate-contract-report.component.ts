import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ViewContractorsComponent } from '../../viewContractors/view-contractors/view-contractors.component';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { ContractorService } from 'src/app/services/contractor.service';
import { CreateContractorModalComponent } from '../../viewContractors/view-contractors/createContractorModal/create-contractor-modal/create-contractor-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generate-contract-report',
  templateUrl: './generate-contract-report.component.html',
  styleUrls: ['./generate-contract-report.component.scss']
})

export class GenerateContractReportComponent  implements OnInit {
  dataSource = new MatTableDataSource<Contractor>();

  pdfGenerated: boolean = false

  ngOnInit(): void {
    /*if (this.pdfGenerated) {
      this.generatePDF();
      
    }*/
      this.contractorService.getContractors().subscribe((contractor: any) => {
        this.dataSource.data = contractor;
        this.fetchTableData();
      });
  }

  title = "Contractor report";

  constructor(
    private contractorService: ContractorService,
  ) {}

  @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;
  cardData: any[] = [];

  async fetchTableData() {
    try {
      this.contractorService.getContractors().subscribe({
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

  downloadPDF() {
    this.pdfGenerated = true;
    this.generatePDF();
  }

  generatePDF() {
    if (this.cardData && this.cardData.length > 0) {
      const doc = new jsPDF('landscape');
      let yPos = 20;

      // heading with date
      const today = new Date();
      const formattedDate = today.toDateString();
      const reportHeading =
        'Contractor Report Generated on ' + formattedDate + ' \nGenerated By Admin';
      doc.setFontSize(18);
      doc.text(reportHeading, 10, yPos);
      yPos += 30; // Increase yPos to create more space for the multiline heading

      // Add branding text to the footer
      doc.setFontSize(10); // Set font size for branding text
      doc.setTextColor(0); // Set text color
      doc.text(
        'Extra Dimensions 188 Pty Ltd',
        10,
        doc.internal.pageSize.height - 10
      );

      const tableHeaders = [
        'name',
        'email',
        'phoneNumber',
        'areaOfBusiness',
        'availability',
        //'contractorType',
        '',
      ];
      const colWidths = [40, 40, 40, 40, 40, 40];
      doc.setFontSize(12);

      doc.setFillColor(105, 240, 174);
      doc.setTextColor(0);
      doc.setFont('bold');
      doc.rect(
        10,
        yPos,
        colWidths.reduce((a, b) => a + b),
        10,
        'F'
      );
      let xPos = 10;
      for (let i = 0; i < tableHeaders.length; i++) {
        doc.text(tableHeaders[i], xPos + 2, yPos + 8);
        xPos += colWidths[i];
      }
      yPos += 10;

      doc.setFont('normal');

      this.cardData.forEach((Tenant) => {
        xPos = 10;

        for (let i = 0; i < tableHeaders.length; i++) {
          const headerKey = tableHeaders[i];
          let cellContent = this.getCellContent(Tenant, headerKey);
          if (cellContent.length > colWidths[i] / 3) {
            cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
          }

          console.log(
            `cellContent: ${cellContent}, xPos: ${xPos}, yPos: ${yPos}`
          );
          doc.setTextColor(0);
          doc.text(cellContent, xPos, yPos + 8);
          xPos += colWidths[i];
        }

        yPos += 10;
      });

      doc.save('Contractor_Report.pdf');
    } else {
      console.error("No data to generate PDF.");
    }
  }

  getCellContent(contractor: any, headerKey: any): any {
    switch (headerKey) {
      case 'name':
        return contractor.user.name + " " + contractor.user.surname;
      case 'email':
        return contractor.user.email;
        case 'phoneNumber':
        return contractor.user.phoneNumber;
      case 'areaOfBusiness':
        return contractor.areaOfBusiness;
      case 'availability':
        return contractor.availability;
      /*case 'contractorType':
          return contractor.contractorType;*/
      default:
        return contractor[headerKey] !== undefined && contractor[headerKey] !== null
            ? contractor[headerKey].toString()
            : '';
    }
  }
}

/*import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
import { ViewContractorsComponent } from '../../viewContractors/view-contractors/view-contractors.component';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { ContractorService } from 'src/app/services/contractor.service';
import { CreateContractorModalComponent } from '../../viewContractors/view-contractors/createContractorModal/create-contractor-modal/create-contractor-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { ContractorService } from './../../../../services/contractor.service';

@Component({
  selector: 'app-generate-contract-report',
  templateUrl: './generate-contract-report.component.html',
  styleUrls: ['./generate-contract-report.component.scss']
})
export class GenerateContractReportComponent  implements OnInit {

  dataSource = new MatTableDataSource<Contractor>();

  ngOnInit(): void {
    this.contractorService.getContractors().subscribe((contractor: any) => {
      this.dataSource.data = contractor;
      this.fetchTableData();
    });
  }

  /*ngOnInit(): void {
    this.contractorService.getContractors().subscribe((contractors: any) => {
      this.dataSource.data = contractors;
      this.cardData = contractors; 
    });
  }

  title = "Contractor report";

  constructor(
    private contractorService: ContractorService,
  ) {}

  @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;
  cardData: any[] = [];

  async fetchTableData() {
    try {
      this.contractorService.getContractors().subscribe({
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

  downloadPDF() {
    if (this.cardData && this.cardData.length > 0) {
      const doc = new jsPDF('landscape');
      let yPos = 20;

      const today = new Date();
      const formattedDate = today.toDateString();
      const reportHeading =
        'Contractor Report Generated on ' + formattedDate + ' \nGenerated By Admin';
      doc.setFontSize(18);
      doc.text(reportHeading, 10, yPos);
      yPos += 30;

      doc.setFontSize(10); 
      doc.setTextColor(0); 
      doc.text(
        'Extra Dimensions 188 Pty Ltd',
        10,
        doc.internal.pageSize.height - 10
      );

      const tableHeaders = [
        'name',
        'email',
        'phoneNumber',
        'areaOfBusiness',
        'availability',
        'contractorTypeName',
        '',
      ];
      const colWidths = [40, 40, 40, 40, 40, 40];
      doc.setFontSize(12);

      doc.setFillColor(105, 240, 174);
      doc.setTextColor(0);
      doc.setFont('bold');
      doc.rect(
        10,
        yPos,
        colWidths.reduce((a, b) => a + b),
        10,
        'F'
      );
      let xPos = 10;
      for (let i = 0; i < tableHeaders.length; i++) {
        doc.text(tableHeaders[i], xPos + 2, yPos + 8);
        xPos += colWidths[i];
      }
      yPos += 10;

      doc.setFont('normal');

      this.cardData.forEach((Contractor) => {
        xPos = 10;

        for (let i = 0; i < tableHeaders.length; i++) {
          const headerKey = tableHeaders[i];
          let cellContent = this.getCellContent(Contractor, headerKey);
          if (cellContent.length > colWidths[i] / 3) {
            cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
          }

          console.log(
            `cellContent: ${cellContent}, xPos: ${xPos}, yPos: ${yPos}`
          );
          doc.setTextColor(0);
          doc.text(cellContent, xPos, yPos + 8);
          xPos += colWidths[i];
        }

        yPos += 10;
      });

      doc.save('Contractor_Report.pdf');
    } else {
      console.error("No data to generate PDF.");
    }
  }

  getCellContent(contractor: any, headerKey: any): any {
    switch (headerKey) {
      case 'name':
        return contractor.user.name + " " + contractor.user.surname;
      case 'email':
        return contractor.user.email;
        case 'phoneNumber':
        return contractor.user.phoneNumber;
      case 'areaOfBusiness':
        return contractor.areaOfBusiness;
      case 'availability':
        return contractor.availability;
      case 'contractorTypeName':
        return contractor.contractorTypeName;
      default:
        return contractor[headerKey] !== undefined && contractor[headerKey] !== null
            ? contractor[headerKey].toString()
            : '';
    }
  }
}*/