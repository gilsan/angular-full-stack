import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User, SignupRsp, LoginRsp } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

   login(body: User ): Observable<LoginRsp> {
    return this.http.post<LoginRsp>(`${environment.api_url}/users/login`, body);
   }

   signup(body: User ): Observable<SignupRsp> {
    return this.http.post<SignupRsp>(`${environment.api_url}/users/signup`, body);
   }

   isAuthenticated(token: string): Observable<boolean> {
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json',
          'Authorization': `bearer ${token}`
        })
     };

    return this.http.get<boolean>(`${environment.api_url}/auth/authenticate`, httpOptions);
   }

   forgotPassword(data: { email: string}): Observable<{message: string}> {
     return this.http.post<{message: string}>(`${environment.api_url}/users/forgot-password`, data);
   }

   resetPassword(body): Observable<{success: boolean}> {
       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type' : 'application/json',
           'Authorization': `bearer ${body.token}`
         })
       };
       return this.http.put<{success: boolean}>(`${environment.api_url}/users/reset-password`, { password: body.password}, httpOptions);
   }




}
