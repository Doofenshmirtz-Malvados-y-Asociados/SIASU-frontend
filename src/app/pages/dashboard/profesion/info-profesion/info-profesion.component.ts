import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { profession_data } from '../../../../shared/career_dict';

@Component({
  selector: 'app-info-profesion',
  standalone: true,
  imports: [],
  templateUrl: './info-profesion.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class InfoProfesionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  paramProfession: string = ''
  professionData: any

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramProfession = params['clave'];

      this.professionData = profession_data[this.paramProfession as keyof typeof profession_data]
    });
  }
  
}
