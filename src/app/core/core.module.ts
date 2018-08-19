// import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { TokenHttpInterceptorService } from './services/token-http-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NoAuthGuardService } from './services/no-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
  //   HttpClientModule,

  ],
  declarations: [],
  providers: [AuthService, JwtService, TokenHttpInterceptorService,
    AuthGuardService, NoAuthGuardService
  ]
})
export class CoreModule { }
