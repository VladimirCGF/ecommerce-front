// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
//
// export const authGuard: CanActivateFn = (route, state) => {
//   const token = localStorage.getItem('jwt_token');
//   if (token) {
//     return true;
//   } else {
//     return inject(Router).navigate(['/login']);
//   }
// };
//