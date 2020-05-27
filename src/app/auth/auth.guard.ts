import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { BrowserStorageService } from "./../shared/_services/browser-storage.service";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(
    private browserService: BrowserStorageService,
    private router: Router,
    private authService: AuthService
  ) {
    const userAuth = this.browserService.getLocal("userAuth");
    this.authService.isAuthenticated = userAuth ? true : false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
