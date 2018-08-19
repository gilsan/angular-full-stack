import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Client } from '../models/client';


const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${BASE_URL}/clients`);
  }

  createClient (body: Client): Observable<Client> {
    return this.http.post<Client>(`${BASE_URL}/clients`, body);
 }
  updateClient(id: string, body: Client): Observable<Client> {
    return this.http.put<Client>(`${BASE_URL}/clients/${id}`, body);
 }

 delteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${BASE_URL}/clients/${id}`);
 }



}
