import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ConsumeApiService } from '../../services/consume-api.service';
import { Observable, Subscription } from 'rxjs';
import { ClientesCajaExtra } from '../../models/clientesCajaExtra';
import { formatDate } from '@angular/common';
import { IPage } from '../../models/paginas';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-clientes-caja-extra',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './clientes-caja-extra.component.html',
  styleUrl: './clientes-caja-extra.component.css'
})
export class ClientesCajaExtraComponent implements OnInit, OnDestroy{

  private _roles: string[] = [];

  private _suscription: Subscription = new Subscription();


  private ClientesCajaExtra(pageSize: number = 10, pageNumber: number = 1): void{
    this._consumeAPIService.getClientesCajaExtra(pageSize, pageNumber).subscribe({
      next: (data) => {
        //console.log(data.response);

        this.clientes = data.response.items;
        this.currentPage = data.response.currentPage;
        this.pageSize = data.response.pageSize;
        this.totalPages = data.response.totalPages;
        this.startPage = data.response.startPage;
        this.endPage = data.response.endPage;
        
        this.upDatePagination();
      },
      error: (err) => {
        console.log(err);
      }

    });
  }
  public clientes: ClientesCajaExtra[] = [];

  public ci: string = "";
  public cliente: string = "";
  public createdDate: Date = new Date();
  public telefono: string = "";

  //================== Udate Pagination ==============================
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalPages: number = 0;
  public startPage: number = 0;
  public endPage: number = 0;

  public pageSizeCaption: number = 10;

  public pageShow: IPage[] = [];

  private upDatePagination(): void{
    this.pageShow = [];

    for(let i = this.startPage; i <= this.endPage; i++)
    {
      this.pageShow.push({ active: false, pageNumber: i, text: i.toString() });     
    }
    //console.log(this.pageShow);

    const page: IPage | undefined = this.pageShow.find(item => item.pageNumber == this.currentPage);
      
    //console.log(this.currentPage);
    //console.log(page);

    if (page === undefined){
      this.pageShow[0].active = true;
    }
    else{
      page.active = true;        
    }


  }

  public setPageSize(_pageSize: number = 10): void{
    this.pageSize = _pageSize;
    this.pageSizeCaption = this.pageSize;
    this.ClientesCajaExtra(this.pageSize, this.currentPage);
  }

  public firstPage(): void{
    this.currentPage = 1;
    this.ClientesCajaExtra(this.pageSize, this.currentPage);
  }

  public previutPage(): void{
    this.currentPage -= 1;
    if (this.currentPage < 1) { this.currentPage = 1;}

    this.ClientesCajaExtra(this.pageSize, this.currentPage);
  }
  
  public setCurrentPage(_currentPage: number): void{
    this.currentPage = _currentPage;
    this.ClientesCajaExtra(this.pageSize, this.currentPage);
  }

  public nextPage(): void{
    this.currentPage += 1;    
    if (this.currentPage > this.totalPages) { this.currentPage = this.totalPages; }
    
    this.ClientesCajaExtra(this.pageSize, this.currentPage);
  }

  public lastPage(): void{
    this.currentPage = this.totalPages;
    this.ClientesCajaExtra(this.pageSize, this.currentPage);
  }
  //==================End Pagination ==================================
   
  constructor(private _router : Router, private _userService: UsersService, private _consumeAPIService: ConsumeApiService, private _emitter : EmitterService){
    //this._consumeAPIService.getClientesCajaExtra_1().then(data => this._clients = Array.isArray(data) ? data : [data]);
    
  }

  ngOnInit(): void{
    this._roles = this._userService.getRoles();
    
   
    //====================================================================
    this.ClientesCajaExtra(10, 1);
    
    this._suscription = this._consumeAPIService.Refresh$.subscribe(() => {
      this.ClientesCajaExtra(10, 1);
    });


    this._emitter.$rutaEnUso.emit("/cajaextra")
  }

  public toDate(fecha: string): string{
    const result: string = formatDate(fecha, 'dd/MM/YYYY', 'en-US');    
    return result;
  }

  ngOnDestroy(): void {
    if (this._suscription)
      this._suscription.unsubscribe();
    
    console.log("Destroy de Cliente caja extra ejecutado");
  }

  public addCliente() : void{
    const cliente: any = {
      ci: this.ci,
      cliente: this.cliente,
      telefono: this.telefono
    };

    console.log(cliente);

    this._consumeAPIService.addClienteCajaExtra(cliente).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.ci = "";
    this.cliente = "";
    this.telefono = "";

    console.log("Ya termine 1.");

    this._router.navigate(["/cajaextra"]);
  }

  public editCliente(id: string) :void{
    console.log(id);
  }

  public deleteCliente(id: string) : void{
    console.log(id);
  }
  
  private checkedRolePrivate(role: string): boolean{
    const result: string[] = this._roles.filter(r => r == role);
    
    return (result.length > 0) ;
  }

  public checkedRole(roles: string[]): boolean{
    for (const element of roles) {
      if (this.checkedRolePrivate(element)) {
        return true;
      }
    }
    return false;
  }
//================================================================================
  validateFormat(event: any): void {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }

}
