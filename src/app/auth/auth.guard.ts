import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserStorageService } from './../shared/_services/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authenticated: boolean;

  constructor(private browserService: BrowserStorageService, private router: Router) {
    const userAuth = this.browserService.getLocal('userAuth');
    this.authenticated = userAuth ? true : false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
  
}
