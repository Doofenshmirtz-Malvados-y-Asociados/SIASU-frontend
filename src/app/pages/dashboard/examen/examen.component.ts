import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationsService } from '../../../components/toast-notifications/services/toast-notifications.service';
import { SuccessPopupComponent } from "../../../components/success-popup/success-popup.component";
import { ErrorPopupComponent } from "../../../components/error-popup/error-popup.component";
import { InfoPopupComponent } from '../../../components/info-popup/info-popup.component';

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
    ErrorPopupComponent,
    InfoPopupComponent
],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent implements OnInit {
  constructor(
    private readonly authClient: AuthService,
  ) {}

  @ViewChild('questionType') questionType!: ElementRef;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly notificationService: ToastNotificationsService = inject(ToastNotificationsService);

  fetchStatus = signal<fetchType>('notSend');
  popUpActive = signal<boolean>(false);
  user = this.authClient.currentUser();

  typeOfQuestions = "Me gusta";
  indexQuestion: number = 0;
  sugCareer: string = "";

  questions: Record<string, string[]> = {
    "Me gusta": [
      "Reparar aparatos y máquinas.",
      "Leer libros o revistas científicas.",
      "Ordenar objetos y materiales.",
      "Diseñar, dibujar y pintar.",
      "Ayudar a otros en sus problemas personales.",
      "Influir en los demás.",
      "Decorar espacios y diseñar maquetas.",
      "Explicar la realidad y el comportamiento humano.",
      "Redactar cartas y documentos.",
      "Asistir a exposiciones de arte.",
      "Asistir a reuniones o eventos sociales.",
      "La actividad comercial.",
      "Trabajar en programas computacionales.",
      "Elaborar un proyecto científico.",
      "Las matemáticas aplicadas a un negocio.",
      "Asistir a eventos artísticos como obras de teatro, conciertos, cine, etc.",
      "Hacer nuevos amigos.",
      "Supervisar el trabajo de otros.",
      "Utilizar instrumentos y herramientas para mi trabajo.",
      "Participar en concursos de ciencias.",
      "Manejar equipo de oficina como: computadoras, fax, registradora, etc.",
      "Crear objetos artísticos.", 
      "Explicar cosas y situaciones a los demás.",
      "Dirigir a un grupo para lograr algún fin.",
      "Seguir instrucciones para crear o arreglar un objeto.",
      "Resolver problemas utilizando el método científico.",
      "Llevar un registro de gastos.",
      "Expresar mis emociones a través del arte.",
      "Cooperar y trabajar en grupo.",
      "Organizar a un equipo de trabajo.",
      "Trabajar de manera individual.",
      "Observar los fenómenos físicos como las estrellas, el ciclo del agua, etc.",
      "Organizar datos.",
      "Tocar un instrumento musical.",
      "Realizar acciones para mi comunidad.",
      "Debatir sobre diversos temas.",
      "Las actividades físicas.",
      "Defender con argumentos mis comentarios.",
      "Cumplir las órdenes de mis autoridades.",
      "Leer obras literarias.",
      "Trabajar en actividades de ayuda o de educación.",
      "Dar conferencias.",
      "Seguir procedimientos para elaborar un producto.",
      "Investigar lo que no me queda claro.",
      "Realizar actividades propias de oficina.",
      "Bailar y asistir a espectáculos de danza.",
      "Organizar y atender eventos.",
      "Administrar mi propio negocio.",
      "Hacer manualidades y artesanías.",
      "Analizar temas científicos.",
      "Aprender sobre el comercio.",
      "Tomar fotografías creativas.",
      "Escuchar a las personas.",
      "Lo referente a la economía del país.",
      "Realizar actividades de campo, agricultura y con animales.",
      "Realizar experimentos.",
      "La administración del dinero.",
      "Escribir canciones, cuentos y poemas.",
      "Trabajar como voluntario en una institución de beneficencia.",
      "Emprender proyectos."
    ],
    "Considero que": [
      "Soy reservado, callado, discreto.",
      "Soy intelectual.",
      "Soy ordenado(a).",
      "Soy creativo (a).",
      "Soy generoso(a).",
      "Soy líder.",
      "Soy ahorrativo(a).",
      "Soy curioso y observador.",
      "Soy una persona con habilidades artísticas.",
      "Soy expresivo(a).",
      "Soy servicial.",
      "Soy ambicioso, deseoso, perseverante.",
      "Soy hábil para resolver problemas prácticos.",
      "Soy analítico(a).",
      "Soy eficiente, capaz, hábil.",
      "Soy independiente.",
      "Soy sociable.",
      "Puedo convencer con facilidad a otros.",
      "Soy mejor trabajando solo que en equipo.",
      "Soy introspectivo, reflexivo.",
      "Soy obediente.",
      "Soy sensible.",
      "Soy amable.",
      "Soy popular.",
      "Soy una persona que busca la estabilidad económica y laboral.",
      "Soy una persona con capacidades matemáticas y científicas.",
      "Soy tolerante a lo diferente.",
      "Soy sensible a las manifestaciones artísticas.",
      "Soy comprensivo(a).",
      "Soy audaz, atrevido, intrépido, valiente.",
      "Soy una persona con habilidades mecánicas y atléticas.",
      "Soy una persona con habilidades de liderazgo y persuasión.",
      "Soy conformista.",
      "Soy una persona a la que le gusta el trabajo de oficina.",
      "Soy hábil para influir en las personas.",
      "Soy optimista, alegre, positivo."
    ],
    "Considero que tengo la capacidad de realizar las siguientes actividades": [
      "Utilizar herramientas, aparatos y máquinas para el trabajo.",
      "Participar en concursos de ciencia.",
      "Trabajar con figuras tridimensionales.",
      "Disfrutar de conciertos.",
      "Leer.",
      "Comprender a otras personas fácilmente",
      "Reflexionar y controlar mis emociones.",
      "Participar en actividades sobre la naturaleza.",
      "Decorar lugares o espacios.",
      "Utilizar los instrumentos de laboratorio.",
      "Destacar en lectura de mapas y gráficos.",
      "Tocar un instrumento musical.",
      "Escribir lo que pienso y siento con facilidad.",
      "Participar en campañas de caridad o beneficencia.",
      "Reconocer mis puntos fuertes y mis debilidades.",
      "Observar y estudiar la naturaleza.",
      "Realizar maquetas y diseños de construcción.",
      "Resolver problemas lógicos con facilidad.",
      "Pensar en imágenes.",
      "Actuar en una obra de teatro musical.",
      "Narrar una historia.",
      "Cooperar y trabajar en grupo.",
      "Dirigir mi proyecto de vida.",
      "Identificar la diversidad de la flora y la fauna.",
      "Hacer manualidades con diferentes materiales.",
      "Observar como suceden los fenómenos biológicos.",
      "Percibir las diferencias de tonalidades de mismo color.",
      "Componer una melodía.",
      "Escuchar con atención a otros.",
      "Planear fiestas, reuniones o eventos sociales.",
      "Mantener una alta autoestima.",
      "Cuidar el medio ambiente.",
      "Participar en actividades deportivas.",
      "Dar explicaciones científicas a la mayoría de los sucesos.",
      "Imaginar cómo puede variar un objeto que sufre algún tipo de cambio.",
      "Reconocer diferentes sonidos musicales.",
      "Relatar una noticia con facilidad.",
      "Trabajar como voluntario en un hospital, albergue u otro.",
      "Saber lo que soy capaz de hacer.",
      "Hacer clasificaciones de plantas y animales.",
      "Trabajar la tierra, cosechar y generar productos.",
      "Utilizar la lógica en cualquier situación.",
      "Descubrir similitudes en objetos que aparentemente son diferentes.",
      "Hacer comparaciones entre los diferentes estilos de música.",
      "Valorar el mensaje de un poema.",
      "Tener facilidad para hacer amigos.",
      "Desarrollar al máximo mis capacidades y talentos.",
      "Observar los fenómenos naturales.",
      "Actuar en una obra de teatro.",
      "Realizar investigaciones científicas.",
      "Visualizar mentalmente un diseño.",
      "Cantar temas musicales.",
      "Sacar conclusiones rápidamente.",
      "Desempeñar el cargo de líder.",
      "Reconocer mis sentimientos y emociones.",
      "Realizar investigaciones sobre la naturaleza.",
      "Bailar algún tipo de danza.",
      "Llevar un registro de mis actividades y gastos.",
      "Crear carteles y gráficos.",
      "Interpretar melodías y ritmos.",
      "Escribir cuentos o poesía.",
      "Organizar algún club, grupo o equipo.",
      "Seguir mis propios intereses.",
      "Organizar actividades en defensa del cuidado del ambiente."
    ],
    "Me gustaría desempeñarme en un lugar donde": [
      "Utilice diferentes máquinas y herramientas.",
      "Observe e investigue.",
      "Ordene datos.",
      "Utilice los sentimientos y la imaginación para crear e interpretar en forma artística.",
      "Realice actividades sociales.",
      "Exijan y ofrezcan oportunidades.",
      "Ordene objetos.",
      "Utilice el método científico.",
      "Archive documentos.",
      "Valore la independencia, la intuición y las habilidades artísticas.",
      "Promueva los valores sociales.",
      "Organice actividades.",
      "Trabaje con animales.",
      "Use las habilidades matemáticas.",
      "Realice actividades propias de oficina.",
      "Diseñe productos creativos.",
      "Participe en actividades humanitarias.",
      "Pueda dirigir a los demás.",
      "Estimule habilidades mecánicas.",
      "Trabaje en solución de problemas.",
      "Organice datos escritos y numéricos.",
      "Muestre habilidades artísticas.",
      "Brinde un servicio a otras personas.",
      "Muestre capacidad de liderazgo.",
      "Use métodos sencillos y directos.",
      "Utilice ideas, lenguaje y símbolos.",
      "Trabaje mis actividades en computadora.",
      "Motive a expresar pensamientos y sentimientos.",
      "Trabaje con la conducta humana.",
      "Desempeñe el cargo de supervisor de ventas.",
      "Pueda crear y reparar objetos con las manos.",
      "Valore la capacidad de análisis.",
      "Se respeten las normas institucionales.",
      "Se vea el mundo de manera flexible.",
      "Ayude a las personas.",
      "Tenga la facilidad verbal para convencer a otros.",
      "Las actividades se realicen al aire libre.",
      "Analice la información.",
      "Exista una rutina establecida.",
      "Cuente con valores e influencia personal.",
      "Valore el servicio, la cooperación y la comprensión.",
      "Resuelva problemas de manera práctica."
    ]
  };
  
  answers: Record<string, number[]> = {
    "Me gusta": new Array(this.questions['Me gusta'].length).fill(0),
    "Considero que": new Array(this.questions['Considero que'].length).fill(0),
    "Considero que tengo la capacidad de realizar las siguientes actividades": new Array(this.questions['Considero que tengo la capacidad de realizar las siguientes actividades'].length).fill(0),
    "Me gustaría desempeñarme en un lugar donde": new Array(this.questions['Me gustaría desempeñarme en un lugar donde'].length).fill(0)
  }

  ngOnInit(): void {
    const prevAnswers = localStorage.getItem("answers");

    if (prevAnswers)
      this.answers = JSON.parse(prevAnswers);
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

    // Save current progress on LocalStorage
    this.backupOnLocalStorage();
  }
  
  change(index: number) {
    this.indexQuestion = index;
    
    // Save current progress on LocalStorage
    this.backupOnLocalStorage();
  }

  backupOnLocalStorage() {
    localStorage.setItem("answers", JSON.stringify(this.answers));
  }
  
  onSubmit() {
    if(this.answers['Me gusta'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección gustos", "Faltan por contestar preguntas en la sección de gustos", 'error');
    } else if(this.answers['Considero que'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección personalidad", "Faltan por contestar preguntas en la sección de personalidad", 'error');
    } else if(this.answers['Considero que tengo la capacidad de realizar las siguientes actividades'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección capacidades", "Faltan por contestar preguntas en la sección de capacidades", 'error');
    } else if(this.answers['Me gustaría desempeñarme en un lugar donde'].filter((answer) => answer === 0).length > 0){
      this.notificationService.add("Sección capacidades", "Faltan por contestar preguntas en la sección laboral", 'error');
    } else {
      const response = [...this.answers['Me gusta'], ...this.answers['Considero que'], ...this.answers['Considero que tengo la capacidad de realizar las siguientes actividades'], ...this.answers['Me gustaría desempeñarme en un lugar donde']]
      this.http.post('http://34.125.135.185:3000/response', {user: this.user?.email, responses: response})
        .subscribe({
          next: (res: any) => {
            this.fetchStatus.set('completed');
            switch(res.suggested_career.indexOf(Math.max(...res.suggested_career))) {
              case(0):
                this.sugCareer = "/dashboard/vocacional/resultados/2"
                break
              case(1):
                this.sugCareer = "/dashboard/vocacional/resultados/4"
                break
              case(2):
                this.sugCareer = "/dashboard/vocacional/resultados/5"
                break
              case(3):
                this.sugCareer = "/dashboard/vocacional/resultados/6"
                break
              case(4):
                this.sugCareer = "/dashboard/vocacional/resultados/7"
                break
              default:
                  this.sugCareer = "/dashboard/"
                  break
            }
          },
          error: error => {
            this.fetchStatus.set('error');
          }
        })
    }
  }

  help() {
    this.popUpActive.set(true)
  }
}
