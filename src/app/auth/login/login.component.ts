import { BrowserStorageService } from "./../../shared/_services/browser-storage.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private browserStorageService: BrowserStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.browserStorageService.getLocal("userAuth")) {
      this.authService.isAuth.next(true);
      this.router.navigate(["/"]);
    } else {
      this.authService.isAuth.next(false);
    }
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const userData: User = {
      username: this.loginForm.get("username").value
    };
    this.authService.login(userData);
  }

}
