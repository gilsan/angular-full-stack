import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Invoice } from '../models/invoice';
import { InvoiceService } from './invoices.service';

@Injectable({
  providedIn: 'root'
})
export class EditInvoiceResolverService implements Resolve<Invoice> {

  constructor(
    private router: Router,
    private service: InvoiceService
   ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invoice> {

    const id =  route.paramMap.get('id');

     return this.service.findInvoice(id)
        .pipe(
          take(1),
          map( invoice => {
            if (invoice) {
              return invoice;
            } else {
              this.router.navigate(['/dashboard', 'invoices']);
              return null;
            }
          })
        );

  }
}
