export interface Empleado {
  idEmpleado: string;
  nombre: string;
  apellido: string;
  puesto: string;
  salario: number;
  fechaContratacion: string;
  departamento: string;
  correoElectronico: string;
  fechaNacimiento: string;
  horaEntrada?: string; // Hora de entrada
  horaSalida?: string;  // Hora de salida
  asistio?: boolean;    // Si asistió o no
}
