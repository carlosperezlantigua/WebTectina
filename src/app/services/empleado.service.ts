import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Empleado } from '../models/empleado';
import { ResponseAPI } from '../models/responseAPI';
import { APIResponse } from '../models/apiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);
  private apiUrl : string = appsettings.apiUrl + "Empleados";
  private getAPI : string = "Empleados?pageSize=10&pageNumber=1";
  private postAPI : string = "Empleados";

  constructor() { }

  getList() : Observable<any>{
    this.apiUrl = `${appsettings.apiUrl}/${this.getAPI}`;
    console.log(this.apiUrl);

    return this.http.get<any>(this.apiUrl);
  }

  getList_2() : Observable<APIResponse>{
    this.apiUrl = `${appsettings.apiUrl}/${this.getAPI}`;
    console.log(this.apiUrl);

    return this.http.get<APIResponse>(this.apiUrl);
  }

  lista(){
    this.apiUrl = `${appsettings.apiUrl}/${this.getAPI}`;
    console.log(this.apiUrl);
    console.log(this.http.get<APIResponse>(this.apiUrl))
    return this.http.get<Empleado[]>(this.apiUrl);
  }
  
  obtener(id : string){
    this.apiUrl = `${appsettings.apiUrl}/${this.postAPI}/${id}`;
    console.log(this.apiUrl);
    console.log(this.http.get<any>(this.apiUrl));
    return this.http.get<any>(this.apiUrl);
  }

  crear(objeto : Empleado){
    this.apiUrl = `${appsettings.apiUrl}/${this.postAPI}`;
    console.log(this.apiUrl);
    return this.http.post<any>(this.apiUrl, objeto);
  }

  editar(objeto : Empleado){
    this.apiUrl = `${appsettings.apiUrl}/${this.postAPI}/${objeto.keyId}`;
    console.log(this.apiUrl);
    return this.http.put<ResponseAPI>(this.apiUrl, objeto);
  }

  eliminar(id : string){
    this.apiUrl = `${appsettings.apiUrl}/${this.postAPI}/${id}`;
    console.log(this.apiUrl);
    return this.http.delete<any>(this.apiUrl);
  }

}
