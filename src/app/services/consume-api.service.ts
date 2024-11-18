import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IRole } from '../models/IRole';
import { IClaim } from '../models/IClaim';
import { ClientesCajaExtra } from '../models/clientesCajaExtra';

@Injectable({
  providedIn: 'root'
})
export class ConsumeApiService {

  private _apiTecnica: string = "https://localhost:7060/api/";


  private roleFilter: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  public get Refresh$(){
    return this._refresh$;
  }

  getRoles(): Array<IRole>{
    const url: string = this._apiTecnica + `Role`;
    //return this.http.get(url);
    const rolesName: Array<string> = [
      "Anonymous",
      "Administrador",
      "EditorGeneral", 
      "E_CajaExtra", 
      "E_TanqueCombustible", 
      "E_Lectura", 
      "E_Contrato", 
      "E_OrdenPago"
    ];
    
    const roles: Array<IRole> = [];

    rolesName.forEach(s =>{
      roles.push({checked: false, name: s});
    })
    
    //const role: IRole = {checked: false, name: "Prueba"};

    //roles.push(role);

    return roles
  }

  public getRoleUser(): Array<string>{
    const result: Array<string> = [];
    
    const claims: Observable<any> = this.http.get("https://localhost:7060/api/Login/UserLogin");
    claims.subscribe({
      next: (data) =>{
        //console.log("Imprimiendo data");
        //console.log(data.result);
        const cla: Array<IClaim> = data.result;
        cla.forEach(c => {
          if (c.type == this.roleFilter){
            result.push(c.value);
          }
        });
        //console.log(cla);
        //console.log(result);

        //return result;
      },
      error(err) {
          console.log(err);
      },
      complete() {
          return result;
      },
    });

    return result;
  }
  
  public getClientesCajaExtra(pageSize: number = 10, pageNumber: number = 1): Observable<any>{
    //https://localhost:7060/api/ClientesCajaExtra?pageSize=10&pageNumber=1
    const url: string = this._apiTecnica + "ClientesCajaExtra?" +`pageSize=${pageSize}&pageNumber=${pageNumber}`;
    
    return this.http.get(url);
  }

  public addClienteCajaExtra(cliente: any): Observable<any>{
    const url: string = this._apiTecnica + "ClientesCajaExtra";
    console.log(cliente);

    return this.http.post(url, cliente)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  public getClientesCajaExtra_1() {
    const url: string = "/assets/data/jsondata.json";
    
    return this.http.get<any>(url)
    .toPromise()
    .then(res => <ClientesCajaExtra>res.data)
    .then(data => { return data; });
  }

}
