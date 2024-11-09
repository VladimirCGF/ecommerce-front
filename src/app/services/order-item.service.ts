import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {OrderItem} from "../models/order-item.model";

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getOrderItem(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/orderItem`);
  }

  insertOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<OrderItem>(`${this.baseUrl}/orderItem`, orderItem, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrderItem(id: string, orderItem: OrderItem) {
    return this.http.put(`${this.baseUrl}/orderItem/${id}`, orderItem);
  }

  deleteOrderItem(id: string) {
    return this.http.delete(`${this.baseUrl}/orderItem/${id}`);
  }

  getOrderItemById(id: string): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.baseUrl}/orderItem/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o Stock. Tente novamente mais tarde.'));
  }
}
