import { Component } from '@angular/core';
import { AuthService } from '../../service/anthx.service'; // Asegúrate de que el servicio esté bien importado
import { Usuario } from '../../interface/Usuario'; // Asegúrate de que tienes la interfaz de Usuario

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  // Datos del usuario
  nombreUsuario: string = '';
  contrasena: string = '';
  correoElectronico: string = '';
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';

  constructor(private authService: AuthService) {}

  // Método para registrar un usuario
  registrarUsuario(): void {
    const usuario: Usuario = {
      nombreUsuario: this.nombreUsuario,
      contrasena: this.contrasena,
      correoElectronico: this.correoElectronico,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fechaNacimiento
    };
    
    // Llamamos al servicio para registrar el usuario
    this.authService.registrarUsuario(usuario);
  }
}
