import { Component, OnInit } from '@angular/core';
import { InputRequiredComponent } from "../../componentes/input-required/input-required.component";
import { FormBuilder } from '@angular/forms';
import { ConsumeApiService } from '../../services/consume-api.service';
import { IRole } from '../../models/IRole';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputRequiredComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  public isValidUsername: boolean = false;
  public isValidPassword: boolean = false;
  
  public fullNema: string = "";
  public userName: string = "";
  public password_1: string = "";
  public password_2: string = "";
  public rolesChecked: Array<IRole> = [];

//   public checked: boolean = false;
//   public onSaveUsernameChanged(value: boolean){
//     this.checked = value;
//     console.log(this.checked);
// }

//  onClick(){
//   console.log("Prueba");
//   var element = <HTMLInputElement> document.getElementById("save-info-1");
//   var isChecked = element.checked;
//   console.log(isChecked);
//  }

//  onClick_2(checkedTemp: boolean){
//   console.log("Prueba_2");
  
//   console.log(checkedTemp);
//  }

 onChange(rolename: string): void{
  
  this.rolesChecked.filter(r => r.name == rolename).forEach(r => {
    r.checked = !r.checked;
  });

  // const rolenameResult: string[] = [];

  // this.rolesChecked.filter(r => r.checked == true).forEach(rr => {
  //   rolenameResult.push(rr.name);
  // });
 
 }

 onValidUserName(): void{
  console.log("Imprimiendo roles del ususrio registrado:");
  console.log(this.cosumeApi.getRoleUser());
 }

 onValidPassword(): void{

 }

  ngOnInit(): void {
      this.rolesChecked = this.cosumeApi.getRoles();
  }

  constructor(private formBuilder: FormBuilder, private cosumeApi: ConsumeApiService) { }
  
  public aceptar(): void{
    
  }


}
