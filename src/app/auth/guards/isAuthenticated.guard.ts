import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthStatus } from '../interfaces/authStatus.enum';
import { of } from 'rxjs';


export const isAuthenticatedGuard: CanActivateFn = async (route, state) => {
  const router = inject( Router )
  const authClient = inject( AuthService )

  await authClient.verifyToken().toPromise()

  if (authClient.authStatus() === AuthStatus.notAuthenticated) {
    router.navigateByUrl('/login')
    return false
  }

  return true
};
