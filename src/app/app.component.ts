import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from "./modal/modal.component";
import { EmitterService } from './services/emitter.service';
import { UsersService } from './services/users.service';
import { LoginComponent } from "./pages/login/login.component";
import { IUserInfo } from './models/UserInfo';
import { ScrollToTopComponent } from "./componentes/scroll-to-top/scroll-to-top.component";
import { ScrollToTop1Component } from "./componentes/scroll-to-top1/scroll-to-top1.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ToastrModule, ModalComponent, LoginComponent, ScrollToTopComponent, ScrollToTop1Component],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Prueba API para clientes para caja extra.';

  public showUser: boolean = false;
  public fullName: string = "";
  public email: string = "";
  public userInfo: IUserInfo = {fullName: "", email: ""};

  public rutaEnUso: string = "";

  //public role: string[] = [];

  //user: string = "";
  
  
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   $event.returnValue = "You have unsaved changes! Are you sure you want to leave? Carlos Luis";
  //   alert("Seguro");
  //   console.log("Me fui");
  // }


  constructor(private emitter : EmitterService, private router : Router, private userService: UsersService){}


  ngOnInit(): void {
    
    // this.switchService.$modal.subscribe(valor => {this.modalSwith = valor});
    
    this.emitter.$userShow.subscribe(valor => {
      this.showUser = valor

      if (valor) {        
        this.fullName = this.userService.getFullName();
        this.email = this.userService.getEmail();
        //this.role = this.userService.getRoles();
        console.log("Prueba 11111");
      }
      else{
        this.fullName = "";
        this.email = "";
        console.log("Prueba 22222");
        //this.role = [];
      }      

    });

    this.emitter.$rutaEnUso.subscribe(valor => {
      this.rutaEnUso = valor;
    });

    // this.emitter.$userInfo.subscribe( value => {
    //   this.userInfo = value;
    // });


    //alert("Prueba");
  }

  ngOnDestroy(): void {
    console.log("destroyCookies");
    this.userService.logout();

    this.emitter.$userShow.unsubscribe();

    console.log("On Destroy App");
    this.emitter.$rutaEnUso.unsubscribe();

  }

  // openModal(){
  //   this.switchService.$modal.emit(true);
  // }

  hideUser(): void{
    this.emitter.$userShow.emit(false);
    this.userService.logout();

  }

  gotoControlContrato(){
    this.router.navigate(['/controlContrato', ""]);
    console.log("Entre");
  }
}
