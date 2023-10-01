import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
//import { Chart, ChartOptions } from 'chart.js';
import jsPDF from 'jspdf';
import { PropertiesService } from 'src/app/services/properties.service';
import { Inspection } from 'src/app/shared/Property/Inspection';
import { Property } from 'src/app/shared/Property/Property';
import { Recovery } from 'src/app/shared/Property/Recovery';

@Component({
  selector: 'app-generate-properties-report',
  templateUrl: './generate-properties-report.component.html',
  styleUrls: ['./generate-properties-report.component.scss']
})
export class GeneratePropertiesReportComponent implements OnInit{
  chart: any;
  propertyDetail : Property = new Property();
  recoveries : Recovery[] = [];
  inspections : Inspection[] = [];
  properties : Property[] = [];
  selectedPropertyId: number | undefined;

  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;
  property: any;

  constructor(private _propertiesService : PropertiesService, private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAllProperties();
    this.getAllInspections();
    this.getAllRecoveries();
    //this.generateBarGraph();
  }

  loadProperty(propertyId: number) {
    this._propertiesService.getProperty(propertyId).subscribe((result) => {
      this.propertyDetail = result;
      console.log("Property Result", result);
      this.loadRecoveries(propertyId); // Load recoveries for the selected property
      this.loadInspections(propertyId); // Load inspections for the selected property
    });
  }

  loadRecoveries(propertyId: number) {
    this._propertiesService.getRecoveriesForProperty(propertyId).subscribe((recoveries) => {
      this.recoveries = recoveries;
    });
  }

  loadInspections(propertyId: number) {
    this._propertiesService.getInspectionsForProperty(propertyId).subscribe((inspections) => {
      this.inspections = inspections;
    });
  }

getAllProperties() {
  this._propertiesService.getProperties().subscribe((properties: any) => {
  this.properties = properties;
  console.log("Property Array", properties)
  });
}

getAllInspections() {
  this._propertiesService.getInspections().subscribe((inspections: any) => {
  this.inspections = inspections;
  console.log("Inspection Array", inspections)
  });
}

getAllRecoveries() {
  this._propertiesService.getRecoveries().subscribe((recoveries: any) => {
  this.recoveries = recoveries;
  console.log("Recovery Array", recoveries)
  });
}

// Inside your GeneratePropertiesReportComponent class

/*generateBarGraph() {
  // Fetch properties data (replace with your actual data fetching code)
  this._propertiesService.getProperties().subscribe((properties: Property[]) => {
    const propertyLabels = properties.map(property => `Property ${property.propertyID}`);
    const recoveryAmounts = properties.map(property => {
      return property.recoveries.reduce((total, recovery) => total + recovery.recoveryAmount, 0);
    });

    const chartOptions: ChartOptions = { // Define the chart options
      scales: {
        y: {
          beginAtZero: true // Adjust this to your requirements
        }
      }
    };

    new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: propertyLabels,
        datasets: [{
          label: 'Total Recovery Amounts',
          data: recoveryAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: chartOptions // Use the defined chart options
    });
  });
}*/


  generateReport() {
    if (this.selectedPropertyId !== undefined) {
      this.loadProperty(this.selectedPropertyId);
    }
  }

  generatePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set initial vertical position
    let yPos = 20;

    // Get today's date
    const today = new Date();
    const formattedDate = today.toDateString();

    // Report heading
    const reportHeading = `Property Report for ${this.propertyDetail.description} Generated on ${formattedDate}\nGenerated By Admin`;
    doc.setFontSize(18);
    doc.text(reportHeading, 10, yPos);
    yPos += 30; // Increase yPos to create more space for the multiline heading

    // Add branding text to the footer
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text('Extra Dimensions 188 Pty Ltd', 10, doc.internal.pageSize.height - 10);

    // Set font styles
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);

    // // Add header
    // doc.text(`Property Report: ${this.propertyDetail.description}`, 105, ypos + 20, { align: 'center' });

    // Define margin and line height
    const leftMargin = 20;
    const lineHeight = 6; // Adjust line height for spacing

    // Add broker information
    doc.setFontSize(14);
    doc.text('Broker Information', leftMargin, 40);
    doc.setFontSize(12);
    doc.text(`Name: ${this.propertyDetail.broker.name} ${this.propertyDetail.broker.surname}`, leftMargin, 40 + lineHeight);
    doc.text(`Phone Number: ${this.propertyDetail.broker.phoneNumber}`, leftMargin, 40 + 2 * lineHeight);
    doc.text(`Commission on Property: R${this.propertyDetail.broker.commissionRate * this.propertyDetail.purchaseAmount}`, leftMargin, 40 + 3 * lineHeight);

    // Add recoveries information
    doc.setFontSize(14);
    doc.text('Recoveries Information', leftMargin, 40 + 5 * lineHeight);
    doc.setFontSize(12);
    this.recoveries.forEach((recovery, index) => {
        const recoveryPosition = 40 + (7 + index * 5) * lineHeight;
        doc.text(`Recovery ${index + 1}:
        Amount: R ${recovery.recoveryAmount}
        Description: ${recovery.recoveryDescription}
        Type: ${recovery.recoveryType?.recoveryTypeDescription}`, leftMargin, recoveryPosition);
    });

    // Add inspections information
    doc.setFontSize(14);
    const inspectionsTopMargin = 40 + (7 + this.recoveries.length * 5) * lineHeight;
    doc.text('Inspections Information', leftMargin, inspectionsTopMargin);
    doc.setFontSize(12);

    const inspectionLineCount = 3; // Adjust as needed

    this.inspections.forEach((inspection, index) => {
        const verticalPosition = inspectionsTopMargin + (2 + index * (inspectionLineCount + 1)) * lineHeight;
        doc.text(`Inspection ${index + 1}:
        Date: ${inspection.inspectionDate}
        Description: ${inspection.inspectionDescription}
        Type: ${inspection.inspectionType?.inspectionTypeName}
        Status: ${inspection.inspectionStatus?.inspectionStatusName}`, leftMargin, verticalPosition);
    });

    // Save the PDF
    doc.save('property_report.pdf');
}


generateAllPropertiesReport() {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set font styles
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  this.properties.forEach((property, propertyIndex) => {
      // Add page for each property except the first one
      if (propertyIndex > 0) {
          doc.addPage();
      }

      // Add header
      doc.text(`Property Report: ${property.description}`, 105, 20, { align: 'center' });

      // Define margin and line height
      const leftMargin = 20;
      const lineHeight = 10;

      // Add broker information
      doc.setFontSize(14);
      doc.text('Broker Information', leftMargin, 40);
      doc.setFontSize(12);
      doc.text(`Name: ${property.broker.name} ${property.broker.surname}`, leftMargin, 40 + lineHeight);
      doc.text(`Phone Number: ${property.broker.phoneNumber}`, leftMargin, 40 + 2 * lineHeight);
      doc.text(`Commission on Property: R${property.broker.commissionRate * property.purchaseAmount}`, leftMargin, 40 + 3 * lineHeight);

      // Add line break
      doc.line(20, 40 + 4 * lineHeight, 190, 40 + 4 * lineHeight);

      // Add recoveries information
      doc.setFontSize(14);
      doc.text('Recoveries Information', leftMargin, 40 + 5 * lineHeight);
      doc.setFontSize(12);
      this.recoveries.forEach((recovery, index) => {
          doc.text(`Recovery ${index + 1}:
          Amount: R ${recovery.recoveryAmount}
          Description: ${recovery.recoveryDescription}
          Type: ${recovery.recoveryType?.recoveryTypeDescription}`, leftMargin, 40 + (7 + index * 5) * lineHeight);
          doc.text('', leftMargin, 40 + (8 + index * 5) * lineHeight); // Add line break
      });

      // Add line break
      doc.line(20, 40 + (8 + property.recoveries.length * 5) * lineHeight, 190, 40 + (8 + property.recoveries.length * 5) * lineHeight);

      // Add inspections information
      doc.setFontSize(14);
      doc.text('Inspections Information', leftMargin, 40 + (9 + property.recoveries.length * 5) * lineHeight);
      doc.setFontSize(12);

      const inspectionLineCount = 3; // Adjust as needed

      this.inspections.forEach((inspection, index) => {
          doc.text(`Inspection ${index + 1}:
          Date: ${inspection.inspectionDate}
          Description: ${inspection.inspectionDescription}
          Type: ${inspection.inspectionType?.inspectionTypeName}
          Status: ${inspection.inspectionStatus?.inspectionStatusName}`, leftMargin, 40 + (11 + property.recoveries.length * 5 + index * (inspectionLineCount + 1)) * lineHeight);
          doc.text('', leftMargin, 40 + (12 + property.recoveries.length * 5 + index * (inspectionLineCount + 1)) * lineHeight); // Add line break
      });

      // Add line break
      doc.line(20, 40 + (12 + property.recoveries.length * 5 + property.inspections.length * (inspectionLineCount + 1)) * lineHeight, 190, 40 + (12 + property.recoveries.length * 5 + property.inspections.length * (inspectionLineCount + 1)) * lineHeight);
  });

  // Save the PDF
  doc.save('all_properties_report.pdf');
}
}