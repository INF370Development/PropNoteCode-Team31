import { Component, OnInit } from '@angular/core';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-broker-graph',
  templateUrl: './generate-broker-graph.component.html',
  styleUrls: ['./generate-broker-graph.component.scss']
})

export class GenerateBrokerGraphComponent implements OnInit{
  commission: Map<string, Broker[]> = new Map<string, Broker[]>();
  name: Map<string, Broker[]> = new Map<string, Broker[]>();
  surname: Map<string, Broker[]> = new Map<string, Broker[]>();

  commissionChartData: number[] = [];
  commissionChartLabels: string[] = [];

  constructor(private brokerService: BrokerService, private dialog : MatDialog) {}

  ngOnInit(): void {
    /*this.brokerService
      .getBrokerByCommission()
      .subscribe((commission) => {
        this.commission = commission;
        this.calculateCommissionChartData();
      });*/
  }

  calculateCommissionChartData() {
    this.commissionChartLabels = Array.from(this.commission.keys()).map(Number).map(rate => `${rate * 100}%`);
    this.commissionChartData = this.commissionChartLabels.map((commissionRate) => {
      const brokers = this.commission.get(commissionRate.toString());
      
      if (brokers && brokers.length > 0) {
        // Calculate the average commission rate for these brokers
        const totalCommissionRate = brokers.reduce(
          (total, broker) => total + broker.commissionRate,
          0
        );
        return (totalCommissionRate / brokers.length) * 100; // Percentage
      } else {
        return 0; // Handle the case when there are no brokers for this commission rate
      }
    });
  }
}  

  /*ngOnInit(): void {
    this.brokerService
      .getBrokerByCommission()
      .subscribe((commission) => {
        this.commission = commission;
      });

    this.brokerService
    .getBrokerByName()
    .subscribe((name) => {
      this.name = name;
    });

    this.brokerService
      .getBrokerBySurname()
      .subscribe((surname) => {
        this.surname = surname;
      });
  }*/


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
