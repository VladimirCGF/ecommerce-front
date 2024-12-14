import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Watch} from "../models/watch.model";


@Injectable({
  providedIn: 'root'
})
export class WatchService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.baseUrl}/watches`);
  }

  insertWatch(token: string, watch: Watch): Observable<Watch> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Watch>(`${this.baseUrl}/watches`, watch, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateWatch(token: string, id: string, watch: Watch) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/watches/${id}`, watch, {headers});
  }

  deleteWatch(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/watches/${id}`, {headers});
  }

  getWatchById(id: string): Observable<Watch> {
    return this.http.get<Watch>(`${this.baseUrl}/watches/view/${id}`);
  }

  // getWatchesByIdOrder(id: number): Observable<Watch[]> {
  //   return this.http.get<Watch[]>(`${this.baseUrl}/watches/by-order/${id}`);
  // }

  getWatchesByName(name: string): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.baseUrl}/watches/findByName/${name}`);
  }

  uploadImage(token: string, idWatch: string, name: string, file: File): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('idWatch', idWatch);
    formData.append('nameImage', name);
    formData.append('imagem', file);

    return this.http.put(`${this.baseUrl}/watches/image/upload/${idWatch}`, formData, {headers}).pipe(
      catchError((error) => {
        console.error('Erro no upload:', error);
        return throwError(error);
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o relógio. Tente novamente mais tarde.'));
  }
}
