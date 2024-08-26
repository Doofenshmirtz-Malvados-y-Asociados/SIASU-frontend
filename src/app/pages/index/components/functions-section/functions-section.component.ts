import { Component } from '@angular/core';
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
  selector: 'app-functions-section',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './functions-section.component.html',
  styles: `
    :host {
      width: 100vw;
    }
  `
})
export class FunctionsSectionComponent {
  chartOptions: ChartOptions = {
    series: [
      {
        name: "Afinidad",
        data: [70, 100, 30, 60, 10, 80]
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
      palette: 'palette10'
    }
  };
}
