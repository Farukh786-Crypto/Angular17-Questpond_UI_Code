import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../Services/_index";

export const serverInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.loadAuthUser();

  // Default to original request
  let modifiedReq = req;

  // Only clone if user exists
  if (currentUser) {
    modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
  } else {
    // Still set Content-Type even if no user
    modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  return next(modifiedReq);
};
