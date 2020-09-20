import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<boolean> | boolean {
      return this.auth.user$.pipe(
        take(1),
        map((user) => user != null),
        tap((canEdit) => {
          if (!canEdit) {
            this.router.navigateByUrl('login');
          }
        })
      );
    }
}


