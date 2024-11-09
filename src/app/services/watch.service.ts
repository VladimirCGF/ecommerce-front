import { Injectable } from '@angular/core';
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

  uploadImage(watchId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(`http://localhost:8080/api/watches/${watchId}/upload-imagem`, formData, {
      responseType: 'text' as 'json' // Especifica que a resposta deve ser tratada como texto
    });
  }

  getImages(watchId: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/api/watches/${watchId}/images`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o relógio. Tente novamente mais tarde.'));
  }
}
