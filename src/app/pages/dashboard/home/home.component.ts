import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ResponseService } from '../../../services/respuestas.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { ProgresoService } from '../progreso/progreso.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCareerProfessionalProfiles } from '../../../shared/career_dict';
import { InfoPopupComponent } from '../../../components/info-popup/info-popup.component';

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)

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
    ResponseService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private readonly responseClient: ResponseService,
    private readonly http: HttpClient
  ) {}
  private authClient: AuthService = inject(AuthService);
  private progresoService: ProgresoService = inject(ProgresoService);

  response: any;
  user : any = this.authClient.currentUser();
  path_info: any = getCareerProfessionalProfiles(this.user?.career_id)
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
    this.progresoService.getCoursesTaken()
      .subscribe({
        next: ([coursesOfCareer, coursesTaken]) => {
          this.coursesOfCareer = coursesOfCareer
          this.coursesTaken = coursesTaken

          this.initDashboard(this.coursesOfCareer, this.coursesTaken)
        },
        error: (e) => console.error(e)
      })
    this.http.get(`http://localhost:3000/response/professional_path/${this.user?.email}`, {headers}).subscribe({
        next: (data: any) => {
  
          for (let i = 0; i < data?.affinities.length; i++) {
            this.path_info[i].afinitty = data?.affinities[i]
          }
          this.preddiction = data
          this.chartInit()
        },
        error: (e) => console.error(e)
      })
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
          data: this.preddiction?.affinities
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
        }
      },
      title: {
      },
      xaxis: {
        categories: this.path_info.map(({name}: any) => name),
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
