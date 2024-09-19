import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../auth/auth.service';
import { ToastNotificationsService } from '../../../../../components/toast-notifications/services/toast-notifications.service';
import { Router, RouterLink } from '@angular/router';

interface Course {
  id: string;
  name: string;
  score: number;
  difficulty: number;
  takenAt: string | Date;
}

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './actualizar.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class ActualizarComponent implements OnInit {
  // 0 -> Selection
  // 1 -> Upload File
  // 2 -> Difficulty explanation
  // 3 -> Add difficulty and submit
  constructor(
    private readonly httpClient: HttpClient, 
    private fb: FormBuilder, 
    private authClient: AuthService,
    private toastClient: ToastNotificationsService,
    private router: Router
  ) { }

  typeOfLoad = 0;

  fileName = '';
  dynamicForm!: FormGroup;
  user = this.authClient.currentUser()


  changeTypeOfLoad(n: number) {
    this.typeOfLoad = n;
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);

      this.httpClient.post("http://localhost:3000/utils/load", formData)
        .subscribe({
          next: (res: any) => {
            res.forEach((course: Course) => {
              this.addItem(course.id, course.name, course.score, course.difficulty, course.takenAt);
            })

            this.changeTypeOfLoad(2)
          },
          error: error => console.error("Error: ", error),
        })
    }
  }


  ngOnInit() {
    this.initializeForm();
  }

  // Inicializa el formulario vacío
  initializeForm() {
    this.dynamicForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  // Obtén el FormArray de items
  get items(): FormArray {
    return this.dynamicForm.get('items') as FormArray;
  }

  // Añadir un nuevo item al FormArray
  addItem(id: string = '', name: string = '', score: number = 0, difficulty: number = 0, takenAt: string | Date = '') {
    const itemGroup = this.fb.group({
      id: [id, Validators.required],
      name: [name, Validators.required],
      score: [score, Validators.required],
      difficulty: [difficulty, Validators.required],
      takenAt: [takenAt, Validators.required]
    });
    this.items.push(itemGroup);
  }

  // Método para enviar los datos editados o actualizados
  onSubmit() {
    const data = this.dynamicForm.value.items.map((item: any) => {
      const { id, name, ...rest } = item
      return { course_id: id, ...rest, user_email: this.user?.email }
    })

    this.httpClient.post("http://localhost:3000/course-user/bulk", data)
      .subscribe({
        next: (res: any) => {
          this.toastClient.add("Materias agregadas con exito", "Se te regresará automaticamente a la página anterior", "success")
          
          setTimeout(() => {
            this.router.navigate(['/dashboard/planeacion']);
          }, 3000);

        },
        error: error => console.error("Error: ", error),
      })
  }
}
