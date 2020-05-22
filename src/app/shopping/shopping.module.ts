import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const shoppingRoutes: Routes  = [
  { path: '', component: ShoppingCartComponent }
];

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(shoppingRoutes)
  ],
  exports: [RouterModule]
})
export class ShoppingModule { }
