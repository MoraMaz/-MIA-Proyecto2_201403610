import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate() {
    if(this.auth.getCurrentUser()) return true;
    else  this.router.navigate(["not-found"]);
  }

}
