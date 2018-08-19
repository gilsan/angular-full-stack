import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenHttpInterceptorService implements HttpInterceptor {

  constructor(
    private jwt: JwtService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwt.getToken();
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;

    }
    const _req = req.clone({ setHeaders: headersConfig});

    return next.handle(_req)
       .pipe(  // JWT의 토큰에 설저된 시간이 경과한 경우
         tap( (event: HttpEvent<any>) => {},
        err => {  // localStorage에서 토큰 삭제후, login으로 변경
          if ( err instanceof HttpErrorResponse ) {
           if ( err.status === 401) {
              this.jwt.destroyToken();
              this.router.navigate(['/login']);
           }
          }
        })
       );

  }
}
