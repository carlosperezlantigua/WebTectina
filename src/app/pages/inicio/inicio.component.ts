import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { UsersService } from '../../services/users.service';
import { EmitterService } from '../../services/emitter.service';
import { ClientesCajaExtra } from '../../models/clientesCajaExtra';
import { ConsumeApiService } from '../../services/consume-api.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  cartItems: any[] = [];

  //clientes: ClientesCajaExtra[] = [];

  constructor(private cartService: CartServiceService, private userService: UsersService, private emitter : EmitterService, private _consumeAPIService: ConsumeApiService){
    //this._consumeAPIService.getClientesCajaExtra_1().then(data => this.clientes = Array.isArray(data) ? data : [data]);
    
    
  }

  ngOnInit(): void {
    
    this.cartItems = this.cartService.getItems();
    
    //console.log(this.cartItems);
  }

  addCard(): void{
    this.cartService.addItem("Carlos");
    this.cartService.addItem("Sabrina");

    this.cartItems = this.cartService.getItems();

    console.log(this.cartItems);
  }

  updateCart(): void{
    this.cartItems = this.cartService.getItems();

    console.log(this.cartItems);
  }

  show(): void{
    var a: string = "Carlos,Luis,Perez,";
    const b: number = a.lastIndexOf(",",0);
    a = a.substring(0, a.length - 1);
    console.log(b);
    console.log(a);
  }

  showUser(): void{
    //console.log(this.clientes);

  }

  public toDate(fecha: string): string{
    const result: string = formatDate(fecha, 'dd/MM/YYYY', 'en-US');    
    return result;
  }

  destroyCookies(): void{
    
    
  }
}
