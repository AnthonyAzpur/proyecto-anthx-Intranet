import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/anthx.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.estaAutenticado()) {
      return true;  // Si el usuario está autenticado, se permite el acceso
    } else {
      // Si no está autenticado, redirigir a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
