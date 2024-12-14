import {Injectable} from '@angular/core';
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

  getOrders(token: string): Observable<Orders[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Orders[]>(`${this.baseUrl}/orders`, {headers});
  }

  insertOrders(token: string, orders: Orders): Observable<Orders> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Orders>(`${this.baseUrl}/orders`, orders, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrders(token: string, id: string, orders: Orders) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/orders/${id}`, orders, {headers});
  }

  deleteOrders(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/orders/${id}`, {headers});
  }

  getOrdersById(token: string, id: string): Observable<Orders> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Orders>(`${this.baseUrl}/orders/${id}`, {headers});
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o Orders. Tente novamente mais tarde.'));
  }
}
