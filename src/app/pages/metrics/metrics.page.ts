import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import Chart from 'chart.js/auto';
import { Metric } from 'src/app/core/models/metric.model';
import { MetricsService } from 'src/app/core/services/metrics.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss']
})
export class MetricsPage implements OnInit {

  chart: any = null;
  endDate: Date = new Date();
  initDate: Date = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), 1);
  
  historicUtilization: number = 0;
  historicThatFilter: number = 0;

  successPercentageByDay: number[] = [];
  failurePercentageByDay: number[] = [];

  range: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(this.initDate),
    end: new FormControl<Date | null>(this.endDate),
  });

  constructor(private dateAdapter: DateAdapter<Date>, private metricsService: MetricsService) {
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
    this.getMetrics();
  }

  filterData() {
    this.initDate = this.range.value.start;
    this.endDate = this.range.value.end;
    console.log();

    this.initChart();
    
  }

  getMetrics(): void {
    this.metricsService.getMetrics(this.initDate, this.endDate)
      .subscribe(allMetricsData => this.renderMetricsData(allMetricsData));
    
  }

  renderMetricsData(allMetrics: Metric[]) {
    allMetrics.forEach(metric => {
      let totalSuccess: number = 0;
      let totalFail: number = 0;

      metric.routines.forEach(routine => {
        if (routine.is_finished) {
          totalSuccess++;
        } else {
          totalFail++;
        }
      });
      this.successPercentageByDay.push(Math.trunc((totalSuccess / metric.routines.length) * 100));
      this.failurePercentageByDay.push(Math.trunc((totalFail / metric.routines.length) * 100));
    });

    this.renderHistoricPercentage();
    this.initChart();
  }

  renderHistoricPercentage() {
    if (this.successPercentageByDay.length == 0) {
      return;
    }

    this.historicThatFilter = 
    this.successPercentageByDay
      .reduce((accum: number, actualValue: number) => accum + actualValue, 0) / 
      this.successPercentageByDay.length;
      this.historicThatFilter = Number.parseFloat(this.historicThatFilter.toFixed(2));
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
            data: this.successPercentageByDay,
            borderWidth: 1,
            order: 0
          },
          {
            label: 'Fail',
            data: this.failurePercentageByDay,
            borderWidth: 1,
            order: 1
          },
          {
            label: 'Completed curve',
            data: this.successPercentageByDay.map(percentage => percentage * 0.6),
            borderWidth: 3,
            type: 'line',
            tension: 0.6,
            pointRadius: 0,
            order: 2
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, ticks) {
                  return `${value}%`;
              },
              stepSize: 10
            },
            min: 0,
            max: 100
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
