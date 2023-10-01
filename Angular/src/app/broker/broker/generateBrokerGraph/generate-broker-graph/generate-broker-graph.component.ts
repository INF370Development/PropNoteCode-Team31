import { Component, OnInit } from '@angular/core';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';

@Component({
  selector: 'app-generate-broker-graph',
  templateUrl: './generate-broker-graph.component.html',
  styleUrls: ['./generate-broker-graph.component.scss']
})

export class GenerateBrokerGraphComponent{}
  /*public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
    },
  ];
  public pieChartType: string = 'pie';
  public pieChartLegend = true;
  public pieChartColors: Color[] = [
    {
      backgroundColor: [],
    },
  ];

  constructor() {
    // Initialize chart data here or fetch it from a service
    this.initializeChartData();
  }

  private initializeChartData() {
    // Fetch broker data and populate chart data here
    // Example:
    this.pieChartLabels = ['Label 1', 'Label 2', 'Label 3'];
    this.pieChartData[0].data = [30, 40, 30];
    this.pieChartColors[0].backgroundColor = ['#FF5733', '#33FF57', '#5733FF'];
  }
}*/

  
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
