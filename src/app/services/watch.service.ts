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

  insertWatch(watch: Watch): Observable<Watch> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Watch>(`${this.baseUrl}/watches`, watch, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateWatch(id: string, watch: Watch) {
    return this.http.put(`${this.baseUrl}/watches/${id}`, watch);
  }

  deleteWatch(id: string) {
    return this.http.delete(`${this.baseUrl}/watches/${id}`);
  }

  getWatchById(id: string): Observable<Watch> {
    return this.http.get<Watch>(`${this.baseUrl}/watches/view/${id}`);
  }

  getWatchesByIdOrder(id: number): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.baseUrl}/watches/by-order/${id}`);
  }

  getWatchesByName(name: string): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.baseUrl}/watches/findByName/${name}`);
  }

  uploadImage(idWatch: string, name: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('idWatch', idWatch);
    formData.append('nameImage', name);
    formData.append('imagem', file);

    return this.http.put(`${this.baseUrl}/watches/image/upload/${idWatch}`, formData).pipe(
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
