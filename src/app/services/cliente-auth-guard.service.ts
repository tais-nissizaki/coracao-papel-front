import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteAuthGuardService implements CanActivate {

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authStorageService.ehUsuarioCliente()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
