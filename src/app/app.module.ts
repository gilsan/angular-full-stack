import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing.module';
import { InvoiceService } from './invoices/services/invoices.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHttpInterceptorService } from './core/services/token-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    CoreModule
  ],
  providers: [ InvoiceService,
      { provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptorService, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
