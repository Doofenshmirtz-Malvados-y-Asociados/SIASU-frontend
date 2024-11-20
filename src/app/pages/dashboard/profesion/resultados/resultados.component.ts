import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { ApexAxisChartSeries, ApexChart, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { CareerIDToAlias } from '../../../../interfaces/careerIdtoAlias.enum';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
  career_id = this.auth.currentUser()?.career_id

  path_data: any[] = []
  affinities: any = []


  async ngOnInit(): Promise<void> {
    const data: any = await firstValueFrom(this.http.get(`http://34.16.239.188:3000/ai/professional_path/${this.user_email}`))

    this.affinities = Object.values(data?.affinities[0]).map((affinity: any) => (+(affinity.toFixed(2))))

    this.http.get(`http://34.16.239.188:3000/career-path/filter?career_id=${this.career_id}`).subscribe({
      next: (data: any) => {
        let i = 0;
        
        this.path_data = data.map(({path}: any) => {
          return {
            name: path.name,
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
          data: this.affinities.map((affinity: any) => affinity)
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
