import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Stock} from "../models/stock.model";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/stock`);
  }

  insertStock(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Stock>(`${this.baseUrl}/stock`, stock, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStock(id: string, stock: Stock) {
    return this.http.put(`${this.baseUrl}/stock/${id}`, stock);
  }

  deleteStock(id: string) {
    return this.http.delete(`${this.baseUrl}/stock/${id}`);
  }

  getStockById(id: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/stock/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o Stock. Tente novamente mais tarde.'));
  }
}
