import { Component, inject } from '@angular/core';
import { ResponseService } from '../../../../services/respuestas.service';
import { AuthService } from '../../../../auth/auth.service';
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
  selector: 'app-contestado',
  standalone: true,
  imports: [NgApexchartsModule],
  providers: [
    ResponseService
  ],
  templateUrl: './contestado.component.html',
  styleUrl: './contestado.component.css'
})
export class ContestadoComponent {
  constructor(
    private readonly responseClient: ResponseService
  ) {}
  private authClient: AuthService = inject(AuthService)
  
  user = this.authClient.currentUser()
  response: any;
  carreras: string[] =  ["Ingeniería en Computación", "Ingeniería en Computación", "Ingeniería en informática", "Ingeniería en informática", "Ingeniería Robótica", "Ingeniería en Comunicaciones y Electrónica", "Ingeniería en Biomédica"];
  acronimos: string[] = ["INCO", "ICOM", "INNI", "INFO", "INRO", "INCE", "INBI"]


  chartVocationalOptions?: ChartOptions;

  ngOnInit(): void {
    this.responseClient.getResponseByUser(this.user!.email)
      .subscribe({
        next: (res) => {
          this.response = res;
          this.initSugerencias(res?.suggested_career);
        }
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
  }
}
