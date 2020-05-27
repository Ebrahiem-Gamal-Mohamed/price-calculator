import { BrowserStorageService } from './browser-storage.service';
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as AppEnums from "./../appEnums.enum";

@Injectable({
  providedIn: "root",
})
export class LocalizationService {
  private renderer: Renderer2;
  constructor(
    private translate: TranslateService,
    rendererFactory: RendererFactory2,
    private browserStorageService: BrowserStorageService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  changeLanguage(lang: string) {
    const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    this.translate.use(lang);
    if (lang === AppEnums.Languages.AR) {
      this.renderer.addClass(body, "rtl");
      this.browserStorageService.setLocal('calture', AppEnums.Languages.AR);
    } else {
      if (body.classList.contains('rtl')) {
        this.renderer.removeClass(body, "rtl");
      }
      this.browserStorageService.setLocal('calture', AppEnums.Languages.EN);
    }
  }
}
