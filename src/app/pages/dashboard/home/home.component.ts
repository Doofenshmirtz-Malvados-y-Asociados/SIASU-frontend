import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ResponseService } from '../../../services/respuestas.service';
import { ApexAxisChartSeries, ApexChart, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  theme: ApexTheme;
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
  private authClient: AuthService = inject(AuthService)

  response: any;
  user = this.authClient.currentUser();
  profile: any = null;

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

  ngOnInit() {
    this.responseClient.getResponseByUser(this.user!.email).subscribe(res => {this.response = res})
    this.profile = {"recommendation": "hola"}
  }

}
