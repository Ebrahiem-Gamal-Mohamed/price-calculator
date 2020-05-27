import { Component, OnInit } from "@angular/core";
import { LocalizationService } from "./../../shared/_services/localization.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  constructor(private localization: LocalizationService) {}

  ngOnInit(): void {}

  changeLanguage(lang: string) {
    this.localization.changeLanguage(lang);
  }
}
