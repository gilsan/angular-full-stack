import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice, InvoicePaginationRsp } from '../models/invoice';
import { Observable } from 'rxjs';


const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class InvoiceService {

    constructor(private http: HttpClient ) {}

    getInvoices({page, perPage, sortField, sortDir, filter}): Observable<InvoicePaginationRsp> {
       let queryString =  `${BASE_URL}/invoices?page=${page + 1}&perPage=${perPage}`;
      if (sortField && sortDir) {
         queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
      }
      if (filter) {
        queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}&filter=${filter}`;
      }
      console.log(queryString);
       return  this.http.get<InvoicePaginationRsp>(`${queryString}`);
    }

    createInvoice(body: Invoice) {
      return  this.http.post<Invoice>(`${BASE_URL}/invoices`, body);
    }

    deleteInvoice(id: string): Observable<Invoice>  {
      return this.http.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
    }

    findInvoice(id: string): Observable<Invoice> {
      return this.http.get<Invoice>(`${BASE_URL}/invoices/${id}`);
    }


    updateInvoice(id: string, invoice: Invoice) {
      return this.http.put(`${BASE_URL}/invoices/${id}`, invoice);
    }

    downloadInvoice(id: string) {
      return this.http.get(`${BASE_URL}/invoices/${id}/download`,{
        responseType: 'blob' // response type is used to read binary data
      });
    }

}
