import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexGrid, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';

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
      type: "radar",
      background: 'transparent',
      parentHeightOffset: 0,
      offsetX: 0,
      toolbar: {
        show: false
      },
    },
    title: {
    },
    xaxis: {
      categories: ["Desarrollo FrontEnd", "Desarrollo Backend", "Desarrollo Movil", "DBA", "UI/UX", "Cientifico de datos"]
    },
    yaxis: {
      show: false,
    },
    theme: {
      mode: 'dark',
      palette: 'palette7'
    }
  };
}
