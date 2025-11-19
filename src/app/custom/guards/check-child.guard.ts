import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';


export const checkChildGuard: CanActivateChildFn = (childRoute, state) => {
  // Protects all child routes of a parent
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.loadAuthUser() == undefined) {
    router.navigateByUrl('/login');
    return false; // if we apply false here then child routes will not be accessible
  }
  return true;
};
