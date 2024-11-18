import { Component, inject, Input, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {

  @Input('id') idEmpleado! : string;
  private empleadoServicio = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public formEmpleado : FormGroup = this.formBuild.group({
    nombreCompleto: [''],
    correo:[''],
    sueldo:[0],
    fechaContrato:['']
  });
  
  constructor(private router:Router){}

  ngOnInit(): void {
    console.log("Cargando empleado");
    if(this.idEmpleado != ""){
      this.empleadoServicio.obtener(this.idEmpleado).subscribe({
        next:(data) =>{
          console.log(data);
          this.formEmpleado.patchValue({
            nombreCompleto : data.response.items.nombreCompleto,
            correo : data.response.items.correo,
            sueldo : data.response.items.sueldo,
            fechaContrato : data.response.items.fechaContrato
          })
        },
        error : (err : { message : any; }) =>{
          console.log(err.message)
        }
      })
    }
  }

  guardar(){

    const objeto : Empleado = {
      keyId : this.idEmpleado,
      nombreCompleto : this.formEmpleado.value.nombreCompleto,
      correo : this.formEmpleado.value.correo,
      sueldo : this.formEmpleado.value.sueldo,
      fechaContrato : this.formEmpleado.value.fechaContrato,
    }
  
    if(this.idEmpleado == ""){
      this.empleadoServicio.crear(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            console.log("Se creo el empleado correctamente");
            this.router.navigate(["/inicioTemp"]);
          }else{
            alert("Error al crear")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }else{
      console.log("Edit");
      this.empleadoServicio.editar(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/inicioTemp"]);
          }else{
            alert("Error al editar")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }    
  }

  volver(){
    this.router.navigate(["/inicioTemp"]);
  }
  
}
