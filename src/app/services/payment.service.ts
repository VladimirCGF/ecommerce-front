import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Stock} from "../models/stock.model";
import {Payment} from "../models/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payment`);
  }

  insertPayment(payment: Payment): Observable<Payment> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Payment>(`${this.baseUrl}/payment`, payment, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePayment(id: string, payment: Payment) {
    return this.http.put(`${this.baseUrl}/payment/${id}`, payment);
  }

  deletePayment(id: string) {
    return this.http.delete(`${this.baseUrl}/payment/${id}`);
  }

  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/payment/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o payment. Tente novamente mais tarde.'));
  }
}
