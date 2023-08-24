import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import jsPDF, { jsPDFAPI } from 'jspdf';
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
  
    ngOnInit(): void {
      this.contractorService.getContractors().subscribe((contractors: any) => {
        this.dataSource.data = contractors;
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
      if (this.cardData && this.cardData.length > 0) {
        const doc = new jsPDF('landscape'); 
        let yPos = 20;
  
        const today = new Date();
        const formattedDate = today.toDateString();
        doc.setFontSize(18);
        doc.text('Contractor Report - ' + formattedDate, 10, yPos);
        yPos += 15;
  
        const tableHeaders = ['Name', 'Surname', 'Personal Phone Number', 'Email', 'Company Name', 'Company Phone Number'];
        const colWidths = [40, 40, 40, 40, 40, 40, 40];
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
  
        this.cardData.forEach((contractor: Contractor) => {
          xPos = 10;
  
          for (let i = 0; i < tableHeaders.length; i++) {
            const headerKey = tableHeaders[i];
            let cellContent = this.getCellContent(contractor, headerKey);
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
  
        doc.save('Contractor_Report.pdf');
      } else {
        console.error("No data to generate PDF.");
      }
    }
  
    getCellContent(contractor: any, headerKey: any): any {
      switch (headerKey) {
        case 'Name':
          return contractor.user.name;
         case 'Surname':
          return contractor.user.surname;
        case 'Personal Phone Number':
          return contractor.phoneNumber;
        case 'Email':
          return contractor.user.email; 
        case 'Company Name':
          return contractor.companyName; 
        case 'Company Phone Number':
          return contractor.companyNumber; 
        default:
          return contractor[headerKey] !== undefined && contractor[headerKey] !== null
              ? contractor[headerKey].toString()
              : '';
      }
    }  
}