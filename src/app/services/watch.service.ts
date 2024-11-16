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

  uploadImage(id: string, nameImage: string, imagem: File): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('nomeImagem', nameImage);
    formData.append('imagem', imagem);

    return this.http.patch(`${this.baseUrl}/watches/image/upload/${id}`, formData);
  }

  getImagePerfil(id: string): string {
    const nameImage = 'perfil.jpg';
    return `http://localhost:8080/api/watches/image/download/${id}/${nameImage}`;
  }

  getImageUrls(id: string, imageNames: string[]): string[] {
    const imageUrls: string[] = [];
    imageNames.forEach(nameImage => {
      const url = `${this.baseUrl}/watches/image/download/${id}/${nameImage}`;
      imageUrls.push(url);
    });
    return imageUrls;
  }

  updateListImage(id: string, watch: Watch | null) {
    return this.http.put(`${this.baseUrl}/watches/atualizarImageUrl/${id}`, watch);
  }

  getListImageUrls(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseUrl}/watches/imageUrlsById/{id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o relógio. Tente novamente mais tarde.'));
  }
}
