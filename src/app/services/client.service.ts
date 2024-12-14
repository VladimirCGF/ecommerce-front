import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Client} from "../models/client.model";
import {Address} from "../models/address.model";
import {Orders} from "../models/orders.model";
import {OrderItem} from "../models/order-item.model";
import {Payment} from "../models/payment.model";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getClient(token: string): Observable<Client[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Client[]>(`${this.baseUrl}/client`, {headers});
  }

  insertClient(token: string, client: Client): Observable<Client> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Client>(`${this.baseUrl}/client`, client, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  createClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'},
    );
    return this.http.post<Client>(`${this.baseUrl}/client/createClient`, client, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClient(token: string, id: string, client: Client) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/client/${id}`, client, {headers});
  }

  deleteClient(token: string, id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/client/${id}`, {headers});
  }

  getClientById(token: string, id: string): Observable<Client> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.get<Client>(`${this.baseUrl}/client/${id}`, {headers});
  }

  getClientByEmail(token: string, email: string): Observable<Client> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.get<Client>(`${this.baseUrl}/client/findByEmail/${email}`, {headers});
  }

  getClientByToken(token: string): Observable<Client> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Client>(`${this.baseUrl}/client/me`, {headers});
  }

  addAddress(token: string, address: Address): Observable<Client> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${token}`);
    return this.http.post<Client>(`${this.baseUrl}/client/addAddress`, address, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  removerAddress(token: string, id: number): Observable<Client> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Client>(`${this.baseUrl}/client/removerAddress/${id}`, {headers});
  }

  addItem(token: string, item: { quantity: any; idWatch: any }): Observable<void> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.baseUrl}/client/addItem`, item, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  removeItem(token: string, idOrderItem: number): Observable<void> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
      .set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.baseUrl}/client/removeItem/${idOrderItem}`, token, {headers});
  }

  checkout(token: string, order: Orders): Observable<Orders> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${token}`);
    return this.http.post<Orders>(`${this.baseUrl}/client/checkout/`, order, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  payment(token: string, payment: Payment): Observable<Payment> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${token}`);
    return this.http.post<Payment>(`${this.baseUrl}/client/payment/`, payment, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  getMyOrders(token: string): Observable<Orders[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Orders[]>(`${this.baseUrl}/client/myListOrders`, {headers});
  }

  getMyAddress(token: string): Observable<Address[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Address[]>(`${this.baseUrl}/client/myListAddress`, {headers});
  }

  getMyOrderItems(id: number, token: string): Observable<OrderItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<OrderItem[]>(`${this.baseUrl}/client/myOrderItems/${id}`, {headers});
  }

  validateEmail(id: number | null, email: string): Observable<boolean> {
    let url = `${this.baseUrl}/client/valid?email=${email}`;
    if (id !== null) {
      url += `&id=${id}`;
    }

    return this.http.get<boolean>(url);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema. Tente novamente mais tarde.'));
  }
}
