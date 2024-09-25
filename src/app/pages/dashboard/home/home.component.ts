import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ResponseService } from '../../../services/respuestas.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { ProgresoService } from '../progreso/progreso.service';

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
    NgApexchartsModule
  ],
  providers: [
    ResponseService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private readonly responseClient: ResponseService
  ) {}
  private authClient: AuthService = inject(AuthService);
  private progresoService: ProgresoService = inject(ProgresoService);

  response: any;
  user = this.authClient.currentUser();
  profile: any = null;
  coursesTaken: any = []
  coursesOfCareer: any = []
  coursesTakenOfCareer: any = []
  optativeCourses: any = []

  percentageTaken: number = 0
  optativeCredits: number = 0

  chartProgressOptions?: ChartProgressOptions

  chartProfesionalOptions: ChartOptions = {
    series: [
      {
        name: "Afinidad",
        data: [46, 99, 24, 45, 12, 92]
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
      categories: ["Desarrollo FrontEnd", "Desarrollo Backend", "DBA", "UI/UX", "Desarrollo Movil", "Cientifico de datos"]
    },
    yaxis: {
      show: false,
    },
    theme: {
      mode: 'dark',
      palette: 'palette11'
    }
  };

  chartVocationalOptions: ChartOptions = {
    series: [
      {
        name: "Afinidad",
        data: [99, 87, 90, 92, 70, 30, 50]
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
      categories: ["INCO", "ICOM", "INNI", "INFO", "INRO", "INCE", "INBI"]
    },
    yaxis: {
      show: false,
    },
    theme: {
      mode: 'dark',
      palette: 'palette11'
    }
  };

  ngOnInit(): void {
    this.responseClient.getResponseByUser(this.user!.email).subscribe(res => {this.response = res})
    this.profile = {"recommendation": "hola"}
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

}
