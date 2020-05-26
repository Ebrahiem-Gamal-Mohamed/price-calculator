import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "./../shared/shared.module";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [HeaderComponent, FooterComponent, RouterModule],
})
export class CoreModule {}
