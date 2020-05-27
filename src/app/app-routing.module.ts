import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

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
  { path: 'login', component: LoginComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
