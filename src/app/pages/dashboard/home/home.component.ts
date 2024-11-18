import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ResponseService } from '../../../services/respuestas.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { ProgresoService } from '../progreso/progreso.service';
import { HttpClient } from '@angular/common/http';
import { getCareerProfessionalProfiles } from '../../../shared/career_dict';
import { InfoPopupComponent } from '../../../components/info-popup/info-popup.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  theme: ApexTheme;
};

export type ChartProgressOptions = {
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
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgApexchartsModule,
    InfoPopupComponent
  ],
  providers: [
    ResponseService,
    ProgresoService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private readonly responseClient: ResponseService,
    private readonly http: HttpClient,
    private readonly progresoService: ProgresoService
  ) {}
  private authClient: AuthService = inject(AuthService);
  

  response: any;
  user : any = this.authClient.currentUser();

  path_data: any[] = []
  affinities: any[] = []

  profile: any = null;
  coursesTaken: any = []
  coursesOfCareer: any = []
  coursesTakenOfCareer: any = []
  optativeCourses: any = []
  preddiction: any
  popUpActive = signal<boolean>(false);

  percentageTaken: number = 0
  optativeCredits: number = 0

  chartProgressOptions?: ChartProgressOptions

  chartProfesionalOptions?: ChartOptions;

  chartVocationalOptions?: ChartOptions;

  ngOnInit(): void {
    this.responseClient.getResponseByUser(this.user!.email)
    .subscribe({
      next: (res) => {
        this.response = res;
        this.initSugerencias(res?.suggested_career);
      }
    })

    if (this.user.career_id != undefined) {
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

    if (this.user.career_id != undefined) {
      this.http.get(`http://localhost:3000/ai/professional_path/${this.user!.email}`).subscribe({
        next: (data: any) => {
          Object.values(data?.affinities[0]).forEach((affinity) => {
            this.affinities.push(affinity);
          })
        },
        error: (e) => console.error(e)
      })
  
      this.http.get(`http://localhost:3000/career-path/filter?career_id=${this.user.career_id}`).subscribe({
        next: (data: any) => {
          let i = 0;
  
          this.path_data = data.map(({path}: any) => {
            return {
              name: path.name,
              affinity: this.affinities[i++],
              salary: path.salary,
              href: path.id
            }
          })
          
          this.chartInit()
        }
      })
    }
  }

  initSugerencias(sugerencias: any): void {
    this.chartVocationalOptions = {
      series: [
        {
          name: "Afinidad",
          data: sugerencias
        }
      ],
      chart: {
        width: '99%',
        height: '100%',
        type: "radar",
        background: 'transparent',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 3000
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
        },
        events: {
          mounted: (chart: any, options: any) => {
            options.config.chart.width = '100%';
            chart.windowResizeHandler();
          }
        }
      },
      title: {
      },
      xaxis: {
        categories: ["ICOM", "INFO", "INRO", "INCE", "INBI"]
      },
      yaxis: {
        show: false,
      },
      theme: {
        mode: 'dark',
        palette: 'palette11'
      }
    };
  }

  initDashboard(coursesOfCareer: any, coursesTaken: any): void {
    const keysCareer = new Set(coursesOfCareer.map((course: any) => course.course_id))
    this.coursesTakenOfCareer = coursesTaken.filter((course: any) => keysCareer.has(course.course_id))
    
    this.optativeCourses = coursesTaken.filter((course: any) => !keysCareer.has(course.course_id))
    this.optativeCredits = this.optativeCourses.reduce((totalCredits: number, course: any) => totalCredits += course.course.credits, 0)

    this.percentageTaken = Math.round((this.coursesTakenOfCareer.length) / coursesOfCareer.length * 100);


    this.chartProgressOptions = {
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
        events: {
          mounted: (chart: any, options: any) => {
            options.config.chart.width = '100%';
            chart.windowResizeHandler();
          }
        }
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

  chartInit() {
    this.chartProfesionalOptions = {
      series: [
        {
          name: "Afinidad",
          data: this.path_data.map(({affinity}: any) => affinity)
        }
      ],
      chart: {
        width: '100%',
        height: '100%',
        type: "radar",
        background: 'transparent',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 3000
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
        },
        events: {
          mounted: (chart: any, options: any) => {
            options.config.chart.width = '100%';
            chart.windowResizeHandler();
          }
        }
      },
      title: {
      },
      xaxis: {
        categories: this.path_data.map(({name}: any) => name),
        labels: {show : false}
      },
      yaxis: {
        show: false,
      },
      theme: {
        mode: 'dark',
        palette: 'palette11'
      }
    };
  }

  help() {
    this.popUpActive.set(true)
  }

}
