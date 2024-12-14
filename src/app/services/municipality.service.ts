import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Municipality} from "../models/municipality.model";

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getMunicipality(token: string): Observable<Municipality[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Municipality[]>(`${this.baseUrl}/municipality`, {headers});
  }

  insertMunicipality(token: string, municipality: Municipality): Observable<Municipality> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Municipality>(`${this.baseUrl}/municipality`, municipality, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMunicipality(token: string, id: string, municipality: Municipality) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/municipality/${id}`, municipality, {headers});
  }

  deleteMunicipality(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/municipality/${id}`, {headers});
  }

  getMunicipalityById(token: string, id: string): Observable<Municipality> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Municipality>(`${this.baseUrl}/municipality/${id}`, {headers});
  }

  getMunicipalityByIdState(idState: string): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${this.baseUrl}/municipality/state/${idState}`);
  }

  validateName(id: number | null, name: string, idState: number): Observable<boolean> {
    let url = `${this.baseUrl}/municipality/valid?name=${name}&idState=${idState}`;
    if (id !== null) {
      url += `&id=${id}`;
    }
    return this.http.get<boolean>(url);
  }


  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o município. Tente novamente mais tarde.'));
  }
}
