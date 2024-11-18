import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio-Temp.component.html',
  styleUrl: './inicio-Temp.component.css'
})

export class InicioTempComponent {

  private empleadoServicio = inject(EmpleadoService);
  public listaEmpleados:Empleado[] = [];
  public displayedColumns : string[] = ['nombreCompleto','correo','sueldo','fechaContrato','accion'];

  private data: any = {};

  obtenerEmpleados(){
    this.empleadoServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaEmpleados = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  getResponse(){
    this.empleadoServicio.getList_2().subscribe( data => {
      this.data = data;
      // console.log(this.data.response.items);
      if (this.data.response.items.length > 0)
        this.listaEmpleados = this.data.response.items;
      console.log(data);
    })
  }
  constructor(private router : Router){
    this.getResponse();

    // this.obtenerEmpleados();
    

  }

  nuevo(){
    this.router.navigate(['/empleado', ""]);
  }

  editar(objeto : Empleado){
    this.router.navigate(['/empleado', objeto.keyId]);
  }
  
  eliminar(objeto : Empleado){
    if(confirm("Desea eliminar el empleado " + objeto.nombreCompleto)){
      console.log(objeto.keyId);
      this.empleadoServicio.eliminar(objeto.keyId).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            // this.obtenerEmpleados();
            this. getResponse();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error : (err)=>{
          console.log(err.message)
        }
      })
    }
  }


}
