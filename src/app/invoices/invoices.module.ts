import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './invoice-listing/invoice-listing.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditInvoiceResolverService } from './services/edit-invoice-resolver.service';
import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [InvoiceListingComponent, InvoiceViewComponent],
  exports: [InvoiceListingComponent],
  providers: [  EditInvoiceResolverService ]
})
export class InvoicesModule { }
