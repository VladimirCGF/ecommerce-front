import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Coupon} from "../models/coupon.model";
import {catchError, map, Observable, throwError} from "rxjs";

interface CheckCodeResponse {
  unique: boolean; // Define a estrutura da resposta do endpoint
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getCoupon(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/coupon`);
  }

  insertCoupon(coupon: Coupon): Observable<Coupon> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Coupon>(`${this.baseUrl}/coupon`, coupon, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCoupon(id: string, coupon: Coupon) {
    return this.http.put(`${this.baseUrl}/coupon/${id}`, coupon);
  }

  deleteCoupon(id: string) {
    return this.http.delete(`${this.baseUrl}/coupon/${id}`);
  }

  getCouponById(id: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${this.baseUrl}/coupon/${id}`);
  }

  findByCode(code: string | null | undefined) {
    return this.http.get<any>(`${this.baseUrl}/coupon/${code}`);
  }

  validateCode(id: number | null, code: string): Observable<boolean> {
    let url = `${this.baseUrl}/coupon/valid?code=${code}`;
    if (id !== null) {
      url += `&id=${id}`;
    }
    return this.http.get<boolean>(url);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o Coupon. Tente novamente mais tarde.'));
  }

}


