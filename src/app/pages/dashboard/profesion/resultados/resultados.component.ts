import { Component, inject } from '@angular/core';
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
  selector: 'app-resultados',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './resultados.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class ResultadosProfesionComponent {
  private authService: AuthService = inject(AuthService);

  name = this.authService.currentUser()?.name
  career = this.authService.currentUser()?.career_id
  
  date = new Date().toLocaleDateString().split('/').map(p => p.padStart(2, '0'))
  formatedDate = `${this.date[0]}/${this.date[1]}/${this.date[2]}`

  chartOptions: ChartOptions = {
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
}
