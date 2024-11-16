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

  getMunicipality(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${this.baseUrl}/municipality`);
  }

  insertMunicipality(municipality: Municipality): Observable<Municipality> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Municipality>(`${this.baseUrl}/municipality`, municipality, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMunicipality(id: string, municipality: Municipality) {
    return this.http.put(`${this.baseUrl}/municipality/${id}`, municipality);
  }

  deleteMunicipality(id: string) {
    return this.http.delete(`${this.baseUrl}/municipality/${id}`);
  }

  getMunicipalityById(id: string): Observable<Municipality> {
    return this.http.get<Municipality>(`${this.baseUrl}/municipality/${id}`);
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
