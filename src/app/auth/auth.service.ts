import { BrowserStorageService } from "./../shared/_services/browser-storage.service";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(
    private browserStorageService: BrowserStorageService,
    private router: Router
  ) {}

  login(userData: User) {
    if (userData) {
      this.browserStorageService.setLocal("userAuth", userData);
      this.router.navigate(["/"]);
    }
  }

  logout() {
    this.browserStorageService.removeFromLocal("userAuth");
    this.router.navigate(["/login"]);
  }
}
