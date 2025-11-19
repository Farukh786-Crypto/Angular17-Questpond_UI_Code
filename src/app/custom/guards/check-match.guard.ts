import { CanMatchFn } from '@angular/router';

export const checkMatchGuard: CanMatchFn = (route, segments) => {
  // Prevents Angular from loading/lazy-loading route entirely
  return true;
};
