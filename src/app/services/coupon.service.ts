import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Coupon} from "../models/coupon.model";
import {catchError, Observable, throwError} from "rxjs";

interface CheckCodeResponse {
  unique: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getCoupon(token: string): Observable<Coupon[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Coupon[]>(`${this.baseUrl}/coupon`, {headers});
  }

  insertCoupon(token: string, coupon: Coupon): Observable<Coupon> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Coupon>(`${this.baseUrl}/coupon`, coupon, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCoupon(token: string, id: string, coupon: Coupon) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/coupon/${id}`, coupon, {headers});
  }

  deleteCoupon(token:string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/coupon/${id}`, {headers});
  }

  getCouponById(token:string, id: string): Observable<Coupon> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Coupon>(`${this.baseUrl}/coupon/${id}`, {headers});
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


