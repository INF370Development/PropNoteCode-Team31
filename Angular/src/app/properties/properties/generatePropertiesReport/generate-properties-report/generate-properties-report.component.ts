import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Chart } from 'chart.js';
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

  constructor(private _propertiesService : PropertiesService, private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAllProperties();
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
      this.generateBarChart(); // Update the chart with new data
    });
  }

getAllProperties() {
  this._propertiesService.getProperties().subscribe((properties: any) => {
  this.properties = properties;
  console.log("Property Array", properties)
  });
}

// Inside your GeneratePropertiesReportComponent class

generateBarChart() {
  const ctx = document.getElementById('barChartCanvas') as HTMLCanvasElement;

  const recoveriesCount = this.recoveries.length;
  const inspectionsCount = this.inspections.length;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Recoveries', 'Inspections'],
      datasets: [
        {
          label: 'Count',
          data: [recoveriesCount, inspectionsCount],
          backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    },

  });
}

  generateReport() {
    if (this.selectedPropertyId !== undefined) {
      this.loadProperty(this.selectedPropertyId);
      // Your PDF generation code here
    }
  }
  generatePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('Property Report', 10, 10);

    // Generate and add the chart as a base64 image
    const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
    // const chartDataURL = canvas.toDataURL('image/png');
    // doc.addImage(chartDataURL, 'PNG', 10, 20, 190, 100);

    // Add broker information
    doc.text('Broker Information:', 10, 130);
    doc.text(`Name: ${this.propertyDetail.broker.name} ${this.propertyDetail.broker.surname}`, 10, 140);
    doc.text(`Phone Number: ${this.propertyDetail.broker.phoneNumber}`, 10, 150);

    // Add recoveries information
    doc.text('Recoveries Information:', 10, 160);
    this.recoveries.forEach((recovery, index) => {
      doc.text(`Recovery ${index + 1}: Amount: R ${recovery.recoveryAmount}, Description: ${recovery.recoveryDescription}`, 10, 170 + index * 10);
    });

    // Add inspections information
    doc.text('Inspections Information:', 10, 180 + this.recoveries.length * 10);
    this.inspections.forEach((inspection, index) => {
      doc.text(`Inspection ${index + 1}: Date: ${inspection.inspectionDate}, Description: ${inspection.inspectionDescription}`, 10, 190 + this.recoveries.length * 10 + index * 10);
    });

    // Save the PDF
    doc.save('property_report.pdf');
  }
}
