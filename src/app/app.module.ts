import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// third parties ...
import { InMemoryWebApiModule } from "angular2-in-memory-web-api";
// modules ...
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
// components ...
import { AppComponent } from "./app.component";

import { InMemService } from "./server/in-memory.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(InMemService, { delay: 500 }),
    AuthModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
