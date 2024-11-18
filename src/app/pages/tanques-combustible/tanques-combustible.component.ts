import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-tanques-combustible',
  standalone: true,
  imports: [],
  templateUrl: './tanques-combustible.component.html',
  styleUrl: './tanques-combustible.component.css'
})
export class TanquesCombustibleComponent implements OnInit{

  private _roles: string[] = [];
  
  constructor(private _router : Router, private _userService: UsersService){}

  ngOnInit(): void{
    this._roles = this._userService.getRoles();
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
  
}
