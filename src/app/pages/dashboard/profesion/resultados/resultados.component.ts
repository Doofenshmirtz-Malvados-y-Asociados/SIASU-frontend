import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { ApexAxisChartSeries, ApexChart, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { CareerIDToAlias } from '../../../../interfaces/careerIdtoAlias.enum';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { career_path_info, getCareerProfessionalProfiles } from "../../../../shared/career_dict";

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

  path_info: any = getCareerProfessionalProfiles(this.career_id)

  preddiction: any
  
  formattedDate: string = ''

  // TODO: Add professional path data from API

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/ai/professional_path/${this.user_email}`).subscribe({
      next: (data: any) => {

        console.log(data.affinities[0])
        let i = 0;

        Object.values(data?.affinities[0]).forEach((affinity) => {
          this.path_info[i].afinitty = affinity;
          i++;
        })

        this.formattedDate = new Date(data?.createdAt).toLocaleDateString()
        this.preddiction = data
        this.chartInit()
      },
      error: (e) => console.error(e)
    })
  }

  private authService: AuthService = inject(AuthService);

  name = this.authService.currentUser()?.name
  career = CareerIDToAlias[this.authService.currentUser()?.career_id || 0]
  
  
  chartOptions?: ChartOptions

  chartInit() {
    this.chartOptions = {
      series: [
        {
          name: "Afinidad",
          data: this.path_info.map(({afinitty}: any) => afinitty)
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
        categories: this.path_info.map(({name}: any) => name)
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
