import { BrowserStorageService } from './../../shared/_services/browser-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  constructor(private browserStorageService: BrowserStorageService) { }

  ngOnInit(): void {
    this.cartItems = this.browserStorageService.getLocal('cart');
  }

}
