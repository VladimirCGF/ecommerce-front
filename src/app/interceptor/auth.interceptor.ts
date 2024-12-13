// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HTTP_INTERCEPTORS,
//   HttpHeaders
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import {LocalStorageService} from "../services/local-storage.service";
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   constructor(private localStorageService: LocalStorageService) { }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = this.localStorageService.getItem('jwt_token');
//     console.log(authToken)
//
//     if (authToken) {
//       const authRequest = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//       return next.handle(authRequest);
//     }
//
//     return next.handle(request);
//   }
//
//
// }
