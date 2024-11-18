import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// export class AuthInterceptorService implements HttpInterceptor{

//   constructor(private _router: Router) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
//     const token: any = localStorage.getItem('token');
//     // token = localStorage.getItem('token');
//     let request = req;

//     if (token) {
//       request = req.clone({
//         setHeaders: {
//           authorization: `Bearer ${ token }`
//         }
//       });
//     }
//     console.log(request);

//     return next.handle(request).pipe(
//       catchError((err: HttpErrorResponse) => {

//         if (err.status === 401) {
//           this._router.navigateByUrl('/login');
//         }

//         throw new Error(err.error);

//       })
//     );
    
    
    
//   }
// }
