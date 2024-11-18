import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmitterService } from '../../services/emitter.service';
import { IClaim } from '../../models/IClaim';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private roleFilter: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  email: string = "";
  password: string = "";
  
  public isValidUsername: boolean = false;
  public isValidPassword: boolean = false;

  constructor(public userService: UsersService, private router : Router, private emitter : EmitterService){}
  
  login(): void{
    this.isValidUsername = (this.email === "");

    this.isValidPassword = (this.password === "");

    if (this.email != "" && this.password != ""){
      const user = { email: this.email, password: this.password };
 
      this.userService.login(user).subscribe({
        next: (data) => {
          // this.userService.setToken(data.text);
          // console.log(data);
          // console.log("Imprimiendo resultados de login");
  
          // console.log(data.result);
          
          this.userService.setToken(data.result);          
          
          this.userService.getClaimsUser().subscribe({
            next: (value) =>{
              const claims: Array<IClaim> = value.result;

              var result: string | undefined = claims.find(c => c.type == "FullName")?.value;
              this.userService.setFullName(result as string);

              result = claims.find(c => c.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.value;
              this.userService.setEmail(result as string);
              
              const roles: string[] = [];
              claims.filter(c => c.type == this.roleFilter).forEach(c => {
                roles.push(c.value);
              });
              this.userService.setRoles(roles);

              console.log("Imprimiendo resultados de login");
              console.log(data.result);
              console.log(this.userService.getFullName());
              console.log(this.userService.getEmail());
              console.log(this.userService.getRoles());

              this.emitter.$userShow.emit(true);
            },
          });

          //this.emitter.$userShow.emit(true);
          this.router.navigate(["/"]);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () =>{
          
        }
      });

    }   
    
  }

    
}
