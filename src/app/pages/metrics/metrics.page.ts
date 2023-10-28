import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss']
})
export class MetricsPage implements OnInit {

  chart: any = [];
  
  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['22/10', '23/10', '24/10', '25/10', '26/10', '27/10', '28/10'],
        datasets: [
          {
            label: 'Completed',
            data: [80, 100, 80, 40, 20, 100, 40],
            borderWidth: 1,
          },
          {
            label: 'Fail',
            data: [20, 0, 20, 60, 80, 0, 60],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, ticks) {
                  return `${value}%`;
              }
            }
          }
        },
        plugins: {
          title: {
              display: true,
              text: 'Metrics from 22/10 to 28/10'
          },
          tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    return `${context.parsed.y}% ${label}`;
                }
            }
        }
        }
      },
    });
  }

}
