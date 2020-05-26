import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { PriceCalcComponent } from './price-calc/price-calc.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PriceCalcComponent }
];

@NgModule({
  declarations: [PriceCalcComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class OrderModule { }
