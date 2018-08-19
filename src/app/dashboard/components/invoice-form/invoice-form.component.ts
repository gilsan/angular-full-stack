import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../invoices/services/invoices.service';
import { Invoice } from '../../../invoices/models/invoice';
import { MatSnackBar } from '@angular/material';
import { ClientService } from '../../../clients/services/client.service';
import { Client } from '../../../clients/models/client';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  clients: Client[] = [];
  invoice: Invoice;
  form: FormGroup;
  title = '계산서만들기';
  constructor(
    private fb: FormBuilder,
    private service: InvoiceService,
    private router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.form = fb.group({
      'item': ['', Validators.required],
      'qty': ['', Validators.required],
      'date': ['', Validators.required],
      'due':  ['', Validators.required],
      'tax': [''],
      'rate': [''],
      'client': [''],
    });
   }

  ngOnInit() {
     this.setInvoiceToFrom();
     this.setClients();
  }

  private setClients() {
    this.clientService.getClients()
    .subscribe( clients => {
    this.clients = clients;
    });
  }
  private setInvoiceToFrom() {
    this.route.params
      .subscribe( params => {
         const id = params['id'];
         if (!id) {
           return;
         }
         this.title = '편집';
         /*
         this.service.findInvoice(id)
          .subscribe( (invoice ) => {
            this.invoice = invoice;
            console.log(invoice);
            this.form.patchValue(this.invoice);
          }, err => this.msgHandler(err, 'Fail'));
          */

         this.route.data.subscribe( (data: {invoice: Invoice}) => {

          this.invoice = data.invoice;
          console.log(data.invoice);
          if (this.invoice.client) {
            this.form.patchValue({client: this.invoice.client._id});
          }
          this.form.patchValue({
            item: this.invoice.item,
            qty:  this.invoice.qty,
            date: this.invoice.date,
            due:  this.invoice.due,
            rate: this.invoice.rate,
            tax:  this.invoice.tax
          });
         });

      });
  }

  onSubmit() {
    if (this.invoice) {
        this.service.updateInvoice(this.invoice._id, this.form.value)
        .subscribe( data => {
          this.snackBar.open('갱신완료', '성공', { duration: 2000});
          this.router.navigate(['dashboard', 'invoice']);
        }, err => this.msgHandler(err, '실패'));
    } else {
     this.service.createInvoice(this.form.value)
       .subscribe( data => {
           if (data) {
             this.msgHandler('계산서 발행', '성공');
             this.form.reset();
             this.router.navigate(['dashboard', 'invoices']);
           }
         },
         err => this.msgHandler(err.message, '실패'));
    }
  }

  msgHandler( message, status) {
     this.snackBar.open(message, status, {duration: 2000});
  }

  cancel() {
    this.router.navigate(['/dashboard', 'invoices']);
  }

}
