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
import { ResultadosProfesionComponent } from './pages/dashboard/profesion/resultados/resultados.component';
import { ResultadosComponent } from './pages/dashboard/examen/resultados/resultados.component';
import { PlaneacionComponent } from './pages/dashboard/progreso/planeacion/planeacion.component';
import { ActualizarComponent } from './pages/dashboard/progreso/planeacion/actualizar/actualizar.component';
import { ProgresoComponent } from './pages/dashboard/progreso/progreso.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { ContestadoComponent } from './pages/dashboard/vocacional/contestado/contestado.component';
import { InfoProfesionComponent } from './pages/dashboard/profesion/info-profesion/info-profesion.component';


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
                path: '',
                title: 'Home',
                component: HomeComponent
            },
            { 
                path: 'profesion',
                title: 'Perfil Profesional',
                component: ProfesionComponent
            },
            { 
                path: 'profesion/resultados',
                title: 'Resultados de Perfil Profesional',
                component: ResultadosProfesionComponent
            },
            { 
                path: 'profesion/info-profesion/:clave',
                title: 'Información de Profesión',
                component: InfoProfesionComponent
            },
            {
                path: 'configuracion',
                title: 'Configuración',
                component: ConfiguracionComponent
            },
            {
                path: 'progreso',
                title: 'Progreso',
                component: ProgresoComponent
            },
            {
                path: 'progreso/planeacion',
                title: 'Planeación',
                component: PlaneacionComponent
            },
            {
                path: 'progreso/planeacion/actualizar',
                title: 'Actualizar progreso de carrera',
                component: ActualizarComponent
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
                path: 'vocacional/contestado',
                title: 'Vocacional',
                component: ContestadoComponent
            },
            {
                path: 'vocacional/examen',
                title: 'Examen',
                component: ExamenComponent
            },
            {
                path: 'vocacional/resultados',
                title: 'Resultados del Examen Vocacional',
                component: ResultadosComponent
            },
        ]
    }
];
