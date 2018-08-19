import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../material.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';




@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    ToolbarComponent,
    InvoiceFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule , ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule,
    ClientsModule
  ],
  providers: [

     { provide: MAT_DATE_LOCALE, useValue: 'ko'} ,

  ]
})
export class DashboardModule { }
