import { Injectable } from '@angular/core';
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

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employee`);
  }

  insertEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'}
    );
    return this.http.post<Employee>(`${this.baseUrl}/employee`, employee, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployee(id: string, employee: Employee) {
    return this.http.put(`${this.baseUrl}/employee/${id}`, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseUrl}/employee/${id}`);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employee/${id}`);
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
