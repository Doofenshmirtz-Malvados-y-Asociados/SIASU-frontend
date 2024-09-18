import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ResponseService } from '../../../services/respuestas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
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

  ngOnInit() {
    console.log(this.user?.email)
    this.responseClient.getResponseByUser(this.user!.email).subscribe(res => {this.response = res; console.log(res);
    })
  }

}
