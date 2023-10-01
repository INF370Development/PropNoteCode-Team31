import { Component, OnInit } from '@angular/core';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-generate-broker-graph',
  templateUrl: './generate-broker-graph.component.html',
  styleUrls: ['./generate-broker-graph.component.scss']
})
export class GenerateBrokerGraphComponent  {
  const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
const values = [10, 25, 15, 30];

// Create a bar chart
const ctx = document.getElementById('myChart') as HTMLCanvasElement;
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categories,
        datasets: [{
            label: 'Values',
            data: values,
            backgroundColor: 'skyblue',
        }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Bar Chart with Set Values',
        },
    },
});

  
  /*brokerData: { name: string; commissionEarned: number }[] = [];
  chart!: Chart<'pie', number[], string>;

  constructor(private brokerService: BrokerService) {}

  ngOnInit() {
    this.loadBrokers();
  }

  loadBrokers() {
    this.brokerService.getBrokers().subscribe((brokers: Broker[]) => {
      this.brokerData = brokers.map((broker) => ({
        name: `${broker.name} ${broker.surname}`,
        commissionEarned: broker.commissionRate * 100,
      }));

      this.createPieChart();
    });
  }

  createPieChart() {
    const labels = this.brokerData.map((broker) => broker.name);
    const data = this.brokerData.map((broker) => broker.commissionEarned);

    const ctx = document.getElementById('commissionPieChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration<'pie', number[], string> = {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              // Add more colors if you have more brokers
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }
}*/
