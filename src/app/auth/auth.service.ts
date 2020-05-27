import { Observable, BehaviorSubject } from 'rxjs';
import { BrowserStorageService } from "./../shared/_services/browser-storage.service";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $isAuth = this.isAuth.asObservable();

  constructor(
    private browserStorageService: BrowserStorageService,
    private router: Router
  ) {}

  login(userData: User) {
    if (userData) {
      this.browserStorageService.setLocal("userAuth", userData);
      this.isAuth.next(true);
      this.router.navigate(["/"]);
    }
  }

  logout() {
    this.browserStorageService.removeFromLocal("userAuth");
    this.isAuth.next(false);
    this.router.navigate(["/login"]);
  }
}
