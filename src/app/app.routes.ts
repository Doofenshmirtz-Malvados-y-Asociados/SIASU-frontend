import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index-page.component';
import { LoginPage } from './pages/login/login.component';
import { RegisterPage } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';
import { EstadisticasComponent } from './pages/dashboard/estadisticas/estadisticas.component';
import { CarreraComponent } from './pages/dashboard/carrera/carrera.component';
import { CarrerasComponent } from './pages/dashboard/carreras/carreras.component';

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
                path: 'estadisticas',
                title: 'Estadisticas',
                component: EstadisticasComponent
            },
            {
                path: 'carrera',
                title: 'Carrera',
                component: CarreraComponent
            },
            {
                path: 'carreras',
                title: 'carreras',
                component: CarrerasComponent
            },
        ]
    }
];
