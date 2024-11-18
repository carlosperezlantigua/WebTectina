import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from './users.service';


export const functionalInterceptor: HttpInterceptorFn = (req, next) => {
  
  const userService = inject(UsersService);
  const token: any = userService.getToken();// localStorage.getItem('tokenInWebAPITecnica');
  const cloneRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(cloneRequest).pipe(
    catchError( (error: HttpErrorResponse) => {
      let errorMessage = "";
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error code: ${error.status}, message: ${error.message}`;
      }
  
      return throwError(() => errorMessage);
    }

    )
  );
};
