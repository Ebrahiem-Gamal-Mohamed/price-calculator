import { BrowserStorageService } from "./../../shared/_services/browser-storage.service";
import { Component, OnInit } from "@angular/core";
import { LocalizationService } from "./../../shared/_services/localization.service";
import * as AppEnums from "./../../shared/appEnums.enum";
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  user: User;
  isArabic: boolean = false;
  constructor(
    private localization: LocalizationService,
    private browserStorageService: BrowserStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.browserStorageService.getLocal('userAuth');
    const calture = this.browserStorageService.getLocal('calture');
    if (!calture) {
      this.browserStorageService.setLocal('calture',  AppEnums.Languages.EN);
    }
    if (calture === AppEnums.Languages.AR){
      this.isArabic = true;
      this.changeLanguage(AppEnums.Languages.AR);
    } else {
      this.isArabic = false;
      this.changeLanguage(AppEnums.Languages.EN);
    }
  }

  changeLanguage(lang: string) {
    lang === AppEnums.Languages.AR ? this.isArabic = true : this.isArabic = false;
    this.localization.changeLanguage(lang);
  }

  logout() {
    this.authService.logout();
  }
}
