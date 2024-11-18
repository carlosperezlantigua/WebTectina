import { EventEmitter, Injectable } from '@angular/core';
import { IUserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  constructor() { }

  $userShow = new EventEmitter<boolean>();

  $userInfo = new EventEmitter<IUserInfo>();

  $rutaEnUso = new EventEmitter<string>();

}