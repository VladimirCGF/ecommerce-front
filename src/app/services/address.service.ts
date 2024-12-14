import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Address} from "../models/address.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getAddress(token: string): Observable<Address[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.get<Address[]>(`${this.baseUrl}/address`, {headers});
  }

  insertAddress(token: string, address: Address): Observable<Address> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Address>(`${this.baseUrl}/address`, address, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAddress(token: string, id: string, address: Address) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/address/${id}`, address, {headers});
  }

  deleteAddress(token:string, id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/address/${id}`, {headers});
  }

  getAddressById(token: string, id: string): Observable<Address> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.get<Address>(`${this.baseUrl}/address/${id}`, {headers});
  }

  getMyListAddress(id: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/address/myList/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o endereço. Tente novamente mais tarde.'));
  }
}
