import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index-page.component';
import { LoginPage } from './pages/login/login.component';
import { RegisterPage } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';
import { CarreraComponent } from './pages/dashboard/carrera/carrera.component';
import { CarrerasComponent } from './pages/dashboard/carreras/carreras.component';
import { ConfiguracionComponent } from './pages/dashboard/configuracion/configuracion.component';
import { VocacionalComponent } from './pages/dashboard/vocacional/vocacional.component';
import { ExamenComponent } from './pages/dashboard/examen/examen.component';
import { CursosComponent } from './pages/dashboard/cursos/cursos.component';
import { ProfesionComponent } from './pages/dashboard/profesion/profesion.component';

export const routes: Routes = [
    {
        path: '',
        title: 'SIASU',
        component: IndexPage,
    },
    {
        path: 'login',
        title: 'Inicia Sesión en SIASU',
        component: LoginPage,
    },
    {
        path: 'register',
        title: 'Registrate en SIASU',
        component: RegisterPage,
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent,
        canActivate: [isAuthenticatedGuard],
        children: [
            { 
                path: 'profesion',
                title: 'Perfil Profesional',
                component: ProfesionComponent
            },
            {
                path: 'configuracion',
                title: 'Configuración',
                component: ConfiguracionComponent
            },
            {
                path: 'carreras',
                title: 'carreras',
                component: CarrerasComponent
            },
            {
                path: 'carreras/:id',
                title: 'Carreras',
                component: CarreraComponent
            },
            {
                path: 'cursos/:id',
                title: 'Cursos',
                component: CursosComponent
            },
            {
                path: 'vocacional',
                title: 'Vocacional',
                component: VocacionalComponent
            },
            {
                path: 'vocacional/examen',
                title: 'Examen',
                component: ExamenComponent
            },
        ]
    }
];
