import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index-page.component';
import { LoginPage } from './pages/login/login.component';
import { RegisterPage } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';

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
        canActivate: [ isAuthenticatedGuard ]
    }
];
