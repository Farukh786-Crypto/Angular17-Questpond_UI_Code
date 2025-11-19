import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../Services/_index';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  // Protects a route from being accessed
  console.log('Auth Guard - User logged in status:', authService.authenticated());
  if (!authService.authenticated()) {
    alert('Access denied. Please log in to access this page.');
    return false;
  }
  return true;
};
