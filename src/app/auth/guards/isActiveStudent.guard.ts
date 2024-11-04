import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';


export const isActiveStudent: CanActivateFn = async (route, state) => {
  const router = inject( Router )
  const authClient = inject( AuthService )

  await authClient.verifyToken().toPromise()

  if (authClient.currentUser()?.career_id === undefined) {
    router.navigateByUrl('/dashboard')
    return false
  }

  return true
};
