import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Payment} from "../models/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getPayment(token: string): Observable<Payment[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Payment[]>(`${this.baseUrl}/payment`, {headers});
  }

  insertPayment(token: string, payment: Payment): Observable<Payment> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Payment>(`${this.baseUrl}/payment`, payment, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePayment(token: string, id: string, payment: Payment) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/payment/${id}`, payment, {headers});
  }

  deletePayment(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/payment/${id}`, {headers});
  }

  getPaymentById(token: string, id: string): Observable<Payment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Payment>(`${this.baseUrl}/payment/${id}`, {headers});
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o payment. Tente novamente mais tarde.'));
  }
}
