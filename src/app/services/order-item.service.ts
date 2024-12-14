import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {OrderItem} from "../models/order-item.model";
import {OrderList} from "../models/order-list.model";

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getOrderItem(token: string): Observable<OrderItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<OrderItem[]>(`${this.baseUrl}/orderItem`, {headers});
  }

  insertOrderItem(token: string, orderItem: OrderItem): Observable<OrderItem> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<OrderItem>(`${this.baseUrl}/orderItem`, orderItem, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrderItem(token: string, id: string, orderItem: OrderItem) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/orderItem/${id}`, orderItem, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOrderItem(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/orderItem/${id}`, {headers});
  }

  getOrderItemById(token: string, id: string): Observable<OrderItem> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<OrderItem>(`${this.baseUrl}/orderItem/${id}`, {headers});
  }

  getByIdOrder(idOrder: number): Observable<OrderList[]> {
    return this.http.get<OrderList[]>(`${this.baseUrl}/orderItem/by-order/${idOrder}`);
  }

  addQuantity(id: number, quantity: number): Observable<void> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.patch<void>(`${this.baseUrl}/orderItem/addQuantity/${id}`, quantity, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  removeQuantity(id: number, quantity: number): Observable<void> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.patch<void>(`${this.baseUrl}/orderItem/removeQuantity/${id}`, quantity, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema. Tente novamente mais tarde.'));
  }
}
