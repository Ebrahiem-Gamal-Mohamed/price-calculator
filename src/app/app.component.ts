import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import * as AppEnums from "./shared/appEnums.enum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(AppEnums.Languages.EN);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(AppEnums.Languages.EN);

    this.translate
      .get("AppTitle")
      .subscribe((text: string) => this.titleService.setTitle(text));
  }
}
