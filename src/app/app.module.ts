import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "./../environments/environment";
// third parties ...
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// modules ...
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
// components ...
import { AppComponent } from "./app.component";

import { InMemService } from "./server/in-memory.service";
import * as AppEnums from "./shared/appEnums.enum";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: AppEnums.Languages.EN,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    environment.production
      ? []
      : HttpClientInMemoryWebApiModule.forRoot(InMemService, 
        { 
          delay: 500,
          dataEncapsulation: false,
          passThruUnknownUrl: true 
        }),
    AuthModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
