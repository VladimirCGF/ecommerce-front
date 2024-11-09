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

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}/states`);
  }

  insertState(state: State): Observable<State> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<State>(`${this.baseUrl}/states`, state, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateState(id: string, state: State) {
    return this.http.put(`${this.baseUrl}/states/${id}`, state);
  }

  deleteState(id: string) {
    return this.http.delete(`${this.baseUrl}/states/${id}`);
  }

  getStateById(id: string): Observable<State> {
    return this.http.get<State>(`${this.baseUrl}/states/${id}`);
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
