import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/anthx.service';
import Swal from 'sweetalert2';  // Importa SweetAlert2

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
      // Si no está autenticado, mostrar alerta con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: '¡Acceso denegado!',
        text: 'Necesitas iniciar sesión para acceder a esta página.',
        confirmButtonText: 'Aceptar',
      });

      // Redirigir a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
