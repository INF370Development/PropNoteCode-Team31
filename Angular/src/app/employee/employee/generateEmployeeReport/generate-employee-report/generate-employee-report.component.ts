import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ViewEmployeeComponent } from '../../viewEmployee/view-employee/view-employee.component';
import { Employee } from 'src/app/shared/UserModels/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { CreateEmployeeModalComponent } from '../../viewEmployee/view-employee/createEmployeeModal/create-employee-modal/create-employee-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generate-employee-report',
  templateUrl: './generate-employee-report.component.html',
  styleUrls: ['./generate-employee-report.component.scss']
})

export class GenerateEmployeeReportComponent implements OnInit  {

  dataSource = new MatTableDataSource<Employee>();

  pdfGenerated: boolean = false

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees: any) => {
      this.dataSource.data = employees;
      this.fetchTableData();
    });
  }

  title = "Employee report";

  constructor(
    private employeeService: EmployeeService,
  ) {}

  @ViewChild('cards', { static: false }) cardsContainer!: ElementRef;
  cardData: any[] = [];

  async fetchTableData() {
    try {
      this.employeeService.getEmployees().subscribe({
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
      let yPos = 30;
      let isOddRow = false;

      //HEADING
      const today = new Date();
      const formattedDate = today.toDateString();
      const reportHeading = 'Employee Report Generated on ' + formattedDate + ' \nGenerated By Admin';
      doc.setFontSize(16); //changed
      //doc.setFontStyle('bold'); //added
      doc.text(reportHeading, 10, yPos);
      yPos += 20;

      // Add branding text to the footer
      doc.setFontSize(10); // Set font size for branding text
      doc.setTextColor(0); // Set text color
      /*doc.text(
        'Extra Dimensions 188 Pty Ltd',
        10,
        doc.internal.pageSize.height - 10
      );*/

      const tableHeaders = [
        'Name',
        'Surname',
        'Email',
        'Phone Number'
      ];
      const colWidths = [40, 40, 60, 40];
      doc.setFontSize(12);

      doc.setFillColor(105, 240, 174);
      doc.setTextColor(0);
      doc.setFont('bold');
      doc.rect(
        10,
        yPos -2,
        colWidths.reduce((a, b) => a + b),
        15,
        'F'
      );
      let xPos = 10;
      for (let i = 0; i < tableHeaders.length; i++) {
        doc.text(tableHeaders[i], xPos + 2, yPos + 8);
        xPos += colWidths[i];
      }
      yPos += 15;

      doc.setFont('normal');

      //FOOTER
      const brandingText = 'Extra Dimensions 188 Pty Ltd' //added
      doc.setFontSize(10);
      doc.setTextColor(100); //changed
      //doc.text('Extra Dimensions 188 Pty Ltd', 10, doc.internal.pageSize.height - 10);
      doc.text(brandingText, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
        align: 'center'
      }); //added

      this.cardData.forEach((Employee, index) => {
        xPos = 10;

        // Check if the row is even and set background color accordingly
        if (isOddRow) {
          doc.setFillColor(240, 240, 240);
        } else {
          doc.setFillColor(255, 255, 255);
        }

        doc.rect(
          10,
          yPos - 2, // Adjust the Y position slightly for background color
          colWidths.reduce((a, b) => a + b),
          10,
          'F'
        );

        for (let i = 0; i < tableHeaders.length; i++) {
          const headerKey = tableHeaders[i];
          let cellContent = this.getCellContent(Employee, headerKey);
          if (cellContent.length > colWidths[i] / 3) {
            cellContent = doc.splitTextToSize(cellContent, colWidths[i] - 10);
          }

          doc.setTextColor(0);
          doc.text(cellContent, xPos, yPos + 8);
          xPos += colWidths[i];
        }
        yPos += 10;
        isOddRow = !isOddRow;
      });


      doc.save('Employee_Report.pdf');
    }
    else {
      console.error("No data to generate PDF.");
    }
  }

  getCellContent(employee: any, headerKey: any): any {
    switch (headerKey) {
      case 'Name':
        return employee.user.name ;
      case 'Surname':
        return employee.user.surname;
      case 'Email':
        return employee.user.email;
        case 'Phone Number':
        return employee.user.phoneNumber;
      default:
        return employee[headerKey] !== undefined && employee[headerKey] !== null
            ? employee[headerKey].toString()
            : '';
    }
  }
}
