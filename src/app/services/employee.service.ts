import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Employee} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getEmployee(token: string): Observable<Employee[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Employee[]>(`${this.baseUrl}/employee`, {headers});
  }

  insertEmployee(token: string, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.post<Employee>(`${this.baseUrl}/employee`, employee, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployee(token: string, id: string, employee: Employee) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    ).set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/employee/${id}`, employee, {headers});
  }

  deleteEmployee(token: string, id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/employee/${id}`, {headers});
  }

  getEmployeeById(token: string, id: string): Observable<Employee> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Employee>(`${this.baseUrl}/employee/${id}`, {headers});
  }

  validateEmail(id: number | null, email: string): Observable<boolean> {
    let url = `${this.baseUrl}/employee/valid?email=${email}`;
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
