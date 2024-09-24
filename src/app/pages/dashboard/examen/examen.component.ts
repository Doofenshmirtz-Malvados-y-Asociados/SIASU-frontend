import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { ToastNotificationsService } from '../../../components/toast-notifications/services/toast-notifications.service';
import { SuccessPopupComponent } from "../../../components/success-popup/success-popup.component";
import { ErrorPopupComponent } from "../../../components/error-popup/error-popup.component";

type fetchType = 'notSend' | 'completed' | 'error';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    SuccessPopupComponent,
    ErrorPopupComponent
],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent {
  constructor(
    private authClient: AuthService,
  ) {}

  @ViewChild('questionType') questionType!: ElementRef;
  private http: HttpClient = inject(HttpClient);
  private notificationService: ToastNotificationsService = inject(ToastNotificationsService);

  fetchStatus = signal<fetchType>('notSend');
  user = this.authClient.currentUser();

  typeOfQuestions = "Te gusta...";
  indexQuestion: number = 0;
  

  questions: Record<string, string[]> = {
    "Te gusta...": [
      "Reparar objetos",
      "Crear objetos",
      "Solucionar problemas complejos",
      "Trabajar en equipo",
      "Diseñar, dibujar, esculpir, decorar",
      "Ir a exposiciones de arte",
      "Desarrollar circuitos",
      "Trabajar en programas computacionales",
      "Utilizar instrumentos y herramientas físicos para tu trabajo",
      "Escribir código",
      "Explicar cosas y situaciones a los demás",
      "Investigar sobre temas médicos",
      "Documentar procedimientos/desarrollos",
      "Las matemáticas aplicadas",
      "Las matemáticas avanzadas",
      "Manejar equipo de oficina",
      "El internet de las cosas (dispositivos inteligentes interconectados)",
      "Conocer cómo funciona internet",
      "Diseñar infraestructura",
      "Leer libros de literatura",
      "Ver anime, leer mangas y/o comics",
      "La ciberseguridad", 
      "Organizar datos",
      "Buscar patrones en tu alrededor",
      "Investigar dudas",
      "La gratificación inmediata",
      "Saber cómo funcionan las cosas",
      "Leer textos técnicos"
    ],
    "Eres...": [
      "Autodidacta",
      "Reservado",
      "Ordenado",
      "Creativo",
      "Curioso",
      "Observador",
      "Expresivo",
      "Hábil resolviendo problemas",
      "Paciente explicando un tema",
      "Ansioso",
      "Una persona con habilidades artísticas",
      "Ingenioso",
      "Analítico",
      "Bueno en matemáticas",
      "Bueno en lógica",
      "Una persona con facilidad de expresión",
      "Conformista"
    ],
    "Tienes capacidad para...": [
      "Utilizar equipo de cómputo",
      "Trabajar con grandes volúmenes de datos",
      "Utilizar herramientas físicas para desempeñar tu trabajo",
      "Leer documentación",
      "Comprender una lectura",
      "Documentar",
      "Controlar las emociones",
      "Redactar",
      "Explicar cosas complejas a los demás",
      "Resolver problemas lógicos",
      "Percibir tonalidades de un mismo color primario",
      "Hacer manualidades",
      "Aprender términos técnicos",
      "Trabajar en equipo",
      "Clasificar cosas",
      "Identificar propiedades y características de objetos",
      "Aplicar la lógica en diversos ámbitos",
      "Descubrir similitudes en objetos aparentemente distintos"
    ]
  };

  answers: Record<string, number[]> = {
    "Te gusta...": new Array(this.questions['Te gusta...'].length).fill(0),
    "Eres...": new Array(this.questions['Eres...'].length).fill(0),
    "Tienes capacidad para...": new Array(this.questions['Tienes capacidad para...'].length).fill(0)
  }

  resetFetchStatus() {
    this.fetchStatus.set('notSend')
  }

  firstLastPosition(first: boolean, last: boolean){
    if (first)
      return 'border-l rounded-l-2xl';
    else if (last)
      return 'border-r rounded-r-2xl';
    else
      return 'border-x';
  }

  indexAnswer(index: number){
    if(index === this.indexQuestion)
      return 'bg-yellow-500/70 hover:bg-yellow-400/50'
    else if (this.answers[this.typeOfQuestions][index] !== 0)
      return 'bg-yellow-700 hover:bg-yellow-400/50'
    else
      return 'bg-yellow-200/50 hover:bg-yellow-300/50'
  }

  onChange(typeOfQuestion: string) {
    this.typeOfQuestions = typeOfQuestion;
    this.indexQuestion = 0;
  }
  
  change(index: number) {
    this.indexQuestion = index;
  }
  
  onSubmit() {
    if(this.answers['Te gusta...'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección gustos", "Faltan por contestar preguntas en la sección de gustos", 'error');
    } else if(this.answers['Eres...'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección personalidad", "Faltan por contestar preguntas en la sección de personalidad", 'error');
    } else if(this.answers['Tienes capacidad para...'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección capacidades", "Faltan por contestar preguntas en la sección de capacidades", 'error');
    } else {
      const response = [...this.answers['Te gusta...'], ...this.answers['Eres...'], ...this.answers['Tienes capacidad para...']]
      this.http.post('http://localhost:3000/response', {user: this.user?.email, responses: response})
        .pipe(
          map(user => !!user),
          catchError(e => of(false))
        )
        .subscribe(
          success => {
            if (success) {
              this.fetchStatus.set('completed');
            }
            else {
              this.fetchStatus.set('error');
            }
          }
        )
    }
  }
}
