import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {State} from "../models/state.model";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getStates(token: string): Observable<State[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<State[]>(`${this.baseUrl}/states`, {headers});
  }

  insertState(token: string, state: State): Observable<State> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<State>(`${this.baseUrl}/states`, state, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateState(token: string, id: string, state: State) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/states/${id}`, state, {headers});
  }

  deleteState(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/states/${id}`, {headers});
  }

  getStateById(token: string, id: string): Observable<State> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<State>(`${this.baseUrl}/states/${id}`, {headers});
  }

  validateName(id: number | null, name: string): Observable<boolean> {
    let url = `${this.baseUrl}/states/validName?name=${name}`;
    if (id !== null) {
      url += `&id=${id}`;
    }
    return this.http.get<boolean>(url);
  }

  validateAbbreviations(id: number | null, abbreviations: string): Observable<boolean> {
    let url = `${this.baseUrl}/states/validAbbreviations?abbreviations=${abbreviations}`;
    if (id !== null) {
      url += `&id=${id}`;
    }
    return this.http.get<boolean>(url);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o estado. Tente novamente mais tarde.'));
  }
}
