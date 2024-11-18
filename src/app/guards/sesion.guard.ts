import { CanActivateFn } from '@angular/router';

export const SesionGuard: CanActivateFn = (route, state) => {
  console.log("Prueba guard.")
  /* Comprobamos si has iniciado sesión */
  //if (localStorage.getItem('token')) {
    /* Si tenemos iniciada la sesión entonces permitimos el acceso */
    //return true;
  //}
  /* En caso contrario redirigimos a la página de inicio de sesión */
  //route.navigate(['/login']);
  return false;

  //return true;
};
