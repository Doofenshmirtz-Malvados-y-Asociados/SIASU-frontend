import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgresoService } from './progreso.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  NgApexchartsModule,
  ApexTheme,
  ApexYAxis,
  ApexGrid,
  ApexDataLabels,
} from "ng-apexcharts";
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  labels: any;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  theme: ApexTheme;
  colors: any;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [RouterLink, NgApexchartsModule, CommonModule],
  templateUrl: './progreso.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class ProgresoComponent implements OnInit {
  private progresoService: ProgresoService = inject(ProgresoService)

  coursesTaken: any = []
  coursesOfCareer: any = []
  coursesTakenOfCareer: any = []
  optativeCourses: any = []

  percentageTaken: number = 0
  optativeCredits: number = 0

  filter: number = 0
  chartOptions?: ChartOptions

  ngOnInit(): void {
    this.progresoService.getCoursesTaken()
      .subscribe({
        next: ([coursesOfCareer, coursesTaken]) => {
          this.coursesOfCareer = coursesOfCareer
          this.coursesTaken = coursesTaken

          this.initDashboard(this.coursesOfCareer, this.coursesTaken)
        },
        error: (e) => console.error(e)
      })
  }

  initDashboard(coursesOfCareer: any, coursesTaken: any): void {
    const keysCareer = new Set(coursesOfCareer.map((course: any) => course.course_id))
    this.coursesTakenOfCareer = coursesTaken.filter((course: any) => keysCareer.has(course.course_id))
    
    this.optativeCourses = coursesTaken.filter((course: any) => !keysCareer.has(course.course_id))
    this.optativeCredits = this.optativeCourses.reduce((totalCredits: number, course: any) => totalCredits += course.course.credits, 0)

    this.percentageTaken = Math.round((this.coursesTakenOfCareer.length) / coursesOfCareer.length * 100);


    this.chartOptions = {
      series: [
         this.coursesTakenOfCareer.length,
          Math.abs(coursesOfCareer?.length - this.coursesTakenOfCareer?.length)
      ],
      labels: ["Cursados", "Restantes"],
      chart: {
        type: "donut",
        height: 150,
        stacked: true,
        stackType: "100%",
        background: 'transparent',
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 0,
        colors: ["#ff0000"]
      },
      title: {
      },
      xaxis: {
        categories: ["Materias"],
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      tooltip: {
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: false
      },
      theme: {
        mode: 'dark',
      },
      colors: ['#a1a1aa', '#27272a'],
      grid: {
        show: false
      },
      dataLabels: {
        enabled: false
      }
    };
  }

  toggleFilter(n: number) {
    this.filter = n;
  }
}
