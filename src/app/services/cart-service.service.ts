import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }

  private _items: any[] = [];

  addItem(item: any): void{
    this._items.push(item);
  }

  getItems(): any[]{
    return this._items;
  }

  removeItem(index: number): void{
    this._items.splice(index, 1);
  }

  clearCart(): void{
    this._items = [];
  }
}
