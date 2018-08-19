import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { Invoice } from '../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  invoice: Invoice;
  total: number;
  isResultsLoading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.route.data.subscribe( (data: { invoice: Invoice }) => {
      // console.log(data);
        this.invoice = data.invoice;
        console.log(this.invoice);

        if ( typeof this.invoice.qty !== 'undefined' && typeof this.invoice.rate !== 'undefined') {
          this.total = this.invoice.qty * this.invoice.rate;
        }
        let salesTax = 0;
        if (typeof this.invoice.tax !== 'undefined') {
            salesTax = this.invoice.tax * this.total / 100;
        }
        this.total += salesTax;

    });
  }

  downloadHandler(id: string) {
    this.isResultsLoading = true;
    this.invoiceService.downloadInvoice(id)
      .subscribe(
        data => {
          console.log(data);
           saveAs(data, this.invoice.item);
           this.isResultsLoading = false;
        },
        err => {
          this.isResultsLoading = false;
          console.log(err);
        }, () => this.isResultsLoading = false
      );
  }

}
