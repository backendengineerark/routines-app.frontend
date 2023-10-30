import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss']
})
export class MetricsPage implements OnInit {

  chart: any = null;
  endDate: Date = new Date();
  initDate: Date = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), 1);

  range: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(this.initDate),
    end: new FormControl<Date | null>(this.endDate),
  });

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-BR');

    this.initDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), 1);
    this.initDate.setHours(0);
    this.initDate.setMinutes(0);
    this.initDate.setSeconds(0);

    this.endDate = new Date();
    this.endDate.setHours(0);
    this.endDate.setMinutes(0);
    this.endDate.setSeconds(0);
  }
  
  ngOnInit(): void {
    this.initChart();
  }

  filterData() {
    this.initDate = this.range.value.start;
    this.endDate = this.range.value.end;
    console.log();

    this.initChart();
    
  }

  initChart(): void {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.getLabels(this.initDate, this.endDate),
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
              text: `Metrics from ${this.initDate.toLocaleString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'})} to ${this.endDate.toLocaleString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'})}`
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

  getLabels(initialDate: Date, endDate: Date): string[] {
    const labels: string[] = [];

    if (initialDate.toISOString().split('T')[0] > endDate.toISOString().split('T')[0]) {
      return labels;
    }

    let incrementDate: number = 0;
    let pendingFormatDates: boolean = true;
    while (pendingFormatDates) {
      const customDate: Date = new Date(initialDate);
      customDate.setDate(customDate.getDate() + incrementDate);
      customDate.setHours(0);
      customDate.setMinutes(0);
      customDate.setSeconds(0);

      if (customDate.toISOString().split('T')[0] > endDate.toISOString().split('T')[0]) {
        pendingFormatDates = false;
        break;
      } 
      labels.push(this.formatDate(customDate));

      incrementDate++;
    }

    return labels;
  }

  formatDate(date: Date): string {
    return `${date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()}/${date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1}`;
  }

}
