import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { ApexAxisChartSeries, ApexChart, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { CareerIDToAlias } from '../../../../interfaces/careerIdtoAlias.enum';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

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
  imports: [NgApexchartsModule, RouterLink],
  templateUrl: './resultados.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class ResultadosProfesionComponent implements OnInit {
  constructor(private readonly http: HttpClient, private readonly auth: AuthService) {}
  
  user_email = this.auth.currentUser()?.email
  career_id: any = this.auth.currentUser()?.career_id

  path_data: any[] = []
  affinities: any[] = []


  ngOnInit(): void {
    this.http.get(`http://localhost:3000/ai/professional_path/${this.user_email}`).subscribe({
      next: (data: any) => {
        Object.values(data?.affinities[0]).forEach((affinity) => {
          this.affinities.push(affinity);
        })
      },
      error: (e) => console.error(e)
    })

    this.http.get(`http://localhost:3000/career-path/filter?career_id=${this.career_id}`).subscribe({
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

  private authService: AuthService = inject(AuthService);

  name = this.authService.currentUser()?.name.split(' ')[0]
  career = CareerIDToAlias[this.authService.currentUser()?.career_id || 0]
  
  
  chartOptions?: ChartOptions

  chartInit() {
    this.chartOptions = {
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
              delay: 100
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
        },
      },
      title: {
      },
      xaxis: {
        categories: this.path_data.map(({name}: any) => name)
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
