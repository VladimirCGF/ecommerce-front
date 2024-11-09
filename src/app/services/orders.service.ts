import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Orders} from "../models/orders.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseUrl}/orders`);
  }

  insertOrders(orders: Orders): Observable<Orders> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Orders>(`${this.baseUrl}/orders`, orders, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrders(id: string, orders: Orders) {
    return this.http.put(`${this.baseUrl}/orders/${id}`, orders);
  }

  deleteOrders(id: string) {
    return this.http.delete(`${this.baseUrl}/orders/${id}`);
  }

  getOrdersById(id: string): Observable<Orders> {
    return this.http.get<Orders>(`${this.baseUrl}/orders/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o Orders. Tente novamente mais tarde.'));
  }
}
