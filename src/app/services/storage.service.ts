import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Storage} from "../models/storage.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getStorages(): Observable<Storage[]> {
    return this.http.get<Storage[]>(`${this.baseUrl}/storage`);
  }

  updateStorage(token: string, id: string, storage: Storage) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/storage/${id}`, storage, {headers});
  }

  deleteStorage(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/storage/${id}`, {headers});
  }

  getStorageById(token: string, id: string): Observable<Storage> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Storage>(`${this.baseUrl}/storage/view/${id}`, {headers});
  }

  getStorageAllByWatchId(id: string): Observable<Storage[]> {
    return this.http.get<Storage[]>(`${this.baseUrl}/storage/findAllByWatchId/${id}`);
  }


  insertStorage(token: string, idWatch: string, name: string, file: File): Observable<Storage> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append('idWatch', idWatch);
    formData.append('nameImage', name);
    formData.append('imagem', file);

    return this.http.post<Storage>(`${this.baseUrl}/storage/image/upload`, formData, {headers}).pipe(
      catchError((error) => {
        console.error('Erro no upload:', error);
        return throwError(error);
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o armazenamento. Tente novamente mais tarde.'));
  }
}
