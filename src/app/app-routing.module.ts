import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  {
    path: "order",
    loadChildren: () =>
      import("./order/order.module").then((m) => m.OrderModule),
  },
  {
    path: "shopping",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./shopping/shopping.module").then((m) => m.ShoppingModule),
  },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
