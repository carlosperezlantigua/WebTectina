import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClaim } from '../models/IClaim';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private _apiTecnica: string = "https://localhost:7060/api/";
  
  private _fullNameFilter: string = "FullName";
  private _roleFilter: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  //private _apiWebApiJWT: string = "https://localhost:7103/WeatherForecast";
  
  private _apiUrl : string = "";

  constructor(private http: HttpClient, private _cookie: CookieService) { }
  
  public login(user: any): Observable<any> {
    this._apiUrl = this._apiTecnica + `Login?userEmail=${user.email}&password=${user.password}`;
    
    return this.http.post(this._apiUrl, null);
  }
  
  public getClaimsUser(): Observable<any>{
    this._apiUrl = this._apiTecnica + "Login/UserLogin";
    return this.http.get(this._apiUrl);
  }

  // public getFullNameUser(): string{
  //    var result: string | undefined;

  //   const claims: Observable<any> = this.http.get("https://localhost:7060/api/Login/UserLogin");
   
  //   claims.subscribe({
  //     next: (value) =>{
  //       const cla: Array<IClaim> = value.result;
        
  //       result = cla.find(c => c.type == "FullName")?.value;
        
  //     },
  //     error: (err) =>{
  //         console.log(err);
  //     },
  //     complete: () =>{
  //         return result;
  //     },
  //   });

  //   return "";
  // }

  // public getRoleUser(): Array<string>{
  //   const result: Array<string> = [];
    
  //   const claims: Observable<any> = this.http.get("https://localhost:7060/api/Login/UserLogin");
  //   claims.subscribe({
  //     next: (data) =>{        
  //       const cla: Array<IClaim> = data.result;
  //       cla.forEach(c => {
  //         if (c.type == this._roleFilter){
  //           result.push(c.value);
  //         }
  //       });
       
  //     },
  //     error: (err) =>{
  //         console.log(err);
  //     },
  //     complete: () =>{
  //         return result;
  //     },
  //   });

  //   return result;
  // }

 
  public logout(): void {
    // remove user data from local storage for log out
    //this.currentUserSubject?.next(this._user);
    this.destroyToken();
  }
  
  private destroyToken(): void{
    // localStorage.removeItem("tokenInWebAPITecnica");
    // localStorage.removeItem("fullNameInWebAPITecnica");
    // localStorage.removeItem("emailInWebAPITecnica");
    this.ThereIsARegisteredUser = false;
    this._cookie.delete("tokenInWebAPITecnica");
    this._cookie.delete("fullNameInWebAPITecnica");
    this._cookie.delete("emailInWebAPITecnica");
    this._cookie.delete("rolesInWebAPITecnica");
  }

  //============Obtiene y estable token en localStorage========================
  public getToken(): string {
    return this._cookie.get("tokenInWebAPITecnica");
    // return localStorage.getItem("tokenInWebAPITecnica");
  }

  public ThereIsARegisteredUser: boolean = false;

  public setToken(token: string): void {
    this._cookie.set("tokenInWebAPITecnica", token)
    this.ThereIsARegisteredUser = true;
    //localStorage.setItem("tokenInWebAPITecnica", token);    
  }

  public getFullName(): string{
    return this._cookie.get("fullNameInWebAPITecnica");
    // return localStorage.getItem("fullNameInWebAPITecnica");
  }

  public setFullName(fullNema: string): void{
    this._cookie.set("fullNameInWebAPITecnica", fullNema)
    //localStorage.setItem("fullNameInWebAPITecnica", fullNema);
  }

  public getEmail(): string{
    return this._cookie.get("emailInWebAPITecnica");
    // return localStorage.getItem("emailInWebAPITecnica");
  }

  public setEmail(email: string): void{
    this._cookie.set("emailInWebAPITecnica", email);
    // localStorage.setItem("emailInWebAPITecnica", email);    
  }

  public getRoles(): string[]{
    const roles: string = this._cookie.get("rolesInWebAPITecnica"); 
    const module: string[] = roles.split(',');

    return module;
    // return localStorage.getItem("emailInWebAPITecnica");
  }

  public setRoles(roles: string[]): void{
    var module: string = "";
    roles.forEach(r =>{
      module += r + ',';
    })
    
    module = module.substring(0, module.length - 1);

    this._cookie.set("rolesInWebAPITecnica", module);
    // localStorage.setItem("emailInWebAPITecnica", email);    
  }


  // =========================CONECIONOES DE PRUEBA ===================
  
  getPaicesObser(): Observable<any>{
    return this.http.get("https://localhost:7103/api/Pais");
  }

  getRolesObser(): Observable<any>{
    return this.http.get("https://localhost:7091/api/Role");
  }

  getWeatherForecastObser(): Observable<any>{
    return this.http.get("https://localhost:7060/WeatherForecast");
  } 

  
}