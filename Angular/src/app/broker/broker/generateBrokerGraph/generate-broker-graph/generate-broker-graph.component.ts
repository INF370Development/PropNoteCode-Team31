import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';

@Component({
  selector: 'app-generate-broker-graph',
  templateUrl: './generate-broker-graph.component.html',
  styleUrls: ['./generate-broker-graph.component.scss']
})
export class GenerateBrokerGraphComponent {
//BROKER GRAPH
brokerDetail: Broker = new Broker();
brokerData: { name: string; commissionEarned: number }[] = [];
chart!: Chart;

constructor(  
  private route: ActivatedRoute,
  //Already here
  private brokerService: BrokerService,) {}

  loadBroker() {
    this.brokerService
      .getBroker(this.route.snapshot.params['id'])
      .subscribe((result) => {
        this.brokerDetail = result;
  
        const commissionEarned = this.brokerDetail.commissionRate * 100;
  
        this.brokerData.push({
          name: `${this.brokerDetail.name} ${this.brokerDetail.surname}`,
          commissionEarned,
        });
  
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

    //this.chart = new Chart(ctx, config);
  }
}