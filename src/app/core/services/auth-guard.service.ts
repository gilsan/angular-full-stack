import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate, CanActivateChild {

  constructor(
    private service: JwtService,
    private authService: AuthService,
    private router: Router) { }

  canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
  ): Observable<boolean> {
     if (this.service.getToken()) {
       return of(true);
     }
     // 토큰 축출
    const token = route.queryParamMap.get('token');
    if (token) {
       return this.authService.isAuthenticated(token)
       .pipe(
         map(authenticated => {
              if (authenticated) {
                this.service.setToken(token);
                return true;
              }
               this.router.navigate(['/login']);
                return false;
         }),
         catchError( (err: any) => {
          this.router.navigate(['/login']);
          return of(false);
         })
       );
    } else  {
       this.router.navigate(['/login']);
      return of(false);
     }

  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
       return this.canActivate(route, state);
  }

}
