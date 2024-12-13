import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {User} from '../models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from "@angular/router";
import {response} from "express";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  private user: User | undefined | null;
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';
  private usuarioLogadoSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router) {
    this.initUsuarioLogado();
  }

  private initUsuarioLogado(): void {
    const token = this.localStorageService.getItem(this.tokenKey);

    if (token == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.getUser(token);
      this.startTokenExpirationTimer();
    }

  }

  public login(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.body.token;
        this.getUser(authToken);

        if (!authToken) {
          throw new Error('Authorization token not found in the response headers');
        }

        this.setToken(authToken);
        const usuarioLogado = res.body;
        if (usuarioLogado) {
          this.setUsuarioLogado(usuarioLogado);
          this.usuarioLogadoSubject.next(usuarioLogado);
        }
        this.startTokenExpirationTimer();
      }),
      catchError((error) => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => error);
      })
    );
  }

  setUsuarioLogado(user: User): void {
    this.localStorageService.setItem(this.usuarioLogadoKey, user);
  }

  getUsuarioLogado(): Observable<User | null> {
    return this.usuarioLogadoSubject.asObservable();
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  removeUsuarioLogado(): void {
    this.localStorageService.removeItem(this.usuarioLogadoKey);
    this.localStorageService.removeItem(this.tokenKey);
    this.usuarioLogadoSubject.next(null);
  }

  getUser(token: string) {
    if (token == null) {
      this.router.navigateByUrl('/login');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<User>(`http://localhost:8080/api/users/me`, {headers}).subscribe({
      next: (user) => {
        this.user = user;
        if (user.role == 'Admin' || user.role == 'Funcionario') {
          // console.log("Employee: ", this.user);
          this.router.navigateByUrl('/admin');
        } else {
          // console.log("Client: ", this.user);
          this.router.navigateByUrl('/ecommerce');
        }
      }
    })
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Token inválido', error);
      return true;
    }
  }

  private startTokenExpirationTimer(): void {
    const token = this.getToken();
    if (!token) return;

    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    const expiresIn = expirationDate ? expirationDate.getTime() - Date.now() : 0;

    if (expiresIn > 0) {
      setTimeout(() => {
        this.removeToken();
        this.removeUsuarioLogado();
        console.log('Token expirado. Usuário foi deslogado.');
      }, expiresIn);
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Houve um problema ao login. Tente novamente mais tarde.'));
  }
}
