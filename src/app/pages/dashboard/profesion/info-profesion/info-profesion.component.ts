import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { profession_data } from '../../../../shared/career_dict';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { SalaryInfoPopUp } from "../../../../components/salary-info-popup/salary-info-popup.component";

@Component({
  selector: 'app-info-profesion',
  standalone: true,
  imports: [SalaryInfoPopUp],
  templateUrl: './info-profesion.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class InfoProfesionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  professionData: any = {}
  career_id = this.auth.currentUser()?.career_id
  popUpActive = signal<boolean>(false);


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get(`http://34.16.239.188:3000/career-path/filter?path_id=${params["clave"]}&career_id=${this.career_id}`).subscribe({
        next: (data: any) => {
          this.professionData = data[0]?.path

          if (!data || data?.length === 0) {
            this.router.navigate(['/dashboard/']);
          }
        },
        error: (error: any) => {
          this.router.navigate(['/dashboard/']);
        }
      })
    });
  }
  
  help() {
    this.popUpActive.set(true)
  }
}
