// guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']); // Redirect to login if not logged in
    return false;
  }

  // For subscription-home route, check subscription status
  if (state.url.includes('subscription-home')) {
    if (!authService.hasSubscription()) {
      router.navigate(['/home']); // Redirect to home if no subscription
      return false;
    }
  }

  // Allow access
  return true;
};