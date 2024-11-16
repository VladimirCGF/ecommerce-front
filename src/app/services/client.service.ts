import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Client} from "../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/client`);
  }

  insertClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Client>(`${this.baseUrl}/client`, client, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClient(id: string, client: Client) {
    return this.http.put(`${this.baseUrl}/client/${id}`, client);
  }

  deleteClient(id: string) {
    return this.http.delete(`${this.baseUrl}/client/${id}`);
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/client/${id}`);
  }

  validateEmail(id: number | null, email: string): Observable<boolean> {
    let url = `${this.baseUrl}/client/valid?email=${email}`;
    if (id !== null) {
      url += `&id=${id}`;
    }
    return this.http.get<boolean>(url);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao inserir o cliente. Tente novamente mais tarde.'));
  }
}
