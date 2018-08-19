import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { remove} from 'lodash';
import { Invoice, InvoicePaginationRsp } from '../models/invoice';
import { InvoiceService } from '../services/invoices.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { of } from 'rxjs';
import {
  switchMap, flatMap, tap, catchError, map,
  startWith, merge   } from 'rxjs/operators';



@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'id', 'item', 'qty', 'date', 'due', 'tax', 'rate', 'action' ];
  dataSource: Invoice[] = [];
//  dataSource = new MatTableDataSource<Invoice>();
  selection = new SelectionModel<Invoice>(true, []);
  resultsLength = 0;
  isresultLoading = false;
  pageIndex = 0;
  pageSize  = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private service: InvoiceService , private router: Router) { }

  ngOnInit() {
    this.populateInvoices();
  }

  ngAfterViewInit() {

    this.indexInvoices();

    this.sort.sortChange.pipe(
      flatMap( data  => {
        return this.service.getInvoices({
           page: this.pageIndex,
           perPage: this.pageSize,
           sortField: data.active,
           sortDir: data.direction });
      })
    ).subscribe((data) => {
      this.dataSource = data.docs;
    } );

  // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0 )
 // merge(this.paginator.page, this.sort.sortChange)
  // .pipe(
  //    merge(this.paginator.page, this.sort.sortChange),
  //   startWith({}),
  //   switchMap(() =>  {
  //      this.isresultLoading = true;
  //      return  this.service.getInvoices({
  //                page: this.pageIndex,
  //                perPage: this.pageSize,
  //                sortField: this.sort.active,
  //                sortDir: this.sort.direction });
  //   }),
  //   map( data => {
  //     this.isresultLoading = false;
  //     this.resultsLength = data.total;
  //     return data.docs;
  //   }),
  //   catchError ( (err) => {
  //     this.isresultLoading = false;
  //     console.log(err);
  //     return of([]);
  //   })
  // ).subscribe( data => {
  //   this.dataSource.data = data;
  // });

  }

   // 초기페이지 보여주기
  private populateInvoices() {
    this.isresultLoading = true;
    this.service.getInvoices({
      page: this.pageIndex,
      perPage: this.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: ''})
    .subscribe( (data: InvoicePaginationRsp) => {
      this.isresultLoading = false;
      this.resultsLength = data.total;
      this.dataSource = data.docs;
     }, err => this.isresultLoading = false, () => this.isresultLoading = false );
  }

  // 인텍스 선택시 페이지 보여주기
  private indexInvoices() {
    this.paginator.page
       .pipe(
        flatMap( data => {
          this.isresultLoading = true;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
        //  console.log('pageIndex:', data.pageIndex, 'pageSize:', data.pageSize);
          return this.service.getInvoices({
            page: data.pageIndex,
            perPage: data.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: '' });
        })
       ).subscribe((datas: InvoicePaginationRsp) => {

            this.resultsLength = datas.total;
            this.dataSource = datas.docs;
            this.isresultLoading = false;
       } );

  }

  addInvoice() {
      this.router.navigate(['dashboard', 'invoices', 'new']);
  }

  delete(id: string)  {
    this.service.deleteInvoice(id)
     .subscribe( data => {
       const removedItems =   remove(this.dataSource.data, (item) => {
             return item._id === data._id;
          });
          this.dataSource.data = [...this.dataSource.data];
       },
       err => console.log(err),
      () =>  this.isresultLoading = false );
}

edit(id: string) {
   this.router.navigate(['dashboard', 'invoices', id]);
}

view(id: string) {
  this.router.navigate(['/dashboard', 'id', 'view']);
}

filterValue(filterText: string) {
   filterText = filterText.trim();
  this.service.getInvoices({
    page: this.pageIndex,
    perPage: this.pageSize,
    sortField: this.sort.active,
    sortDir: this.sort.direction,
    filter: filterText })
  .subscribe( (data: InvoicePaginationRsp) => {
    this.isresultLoading = false;
    this.resultsLength = data.total;
    this.dataSource = data.docs;
   } );
}


}

