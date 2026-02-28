import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Paciente, Doctor } from './services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  
  vistaActual: string = 'pacientes'; 
  
  listaPacientes: Paciente[] = [];
  listaDoctores: Doctor[] = [];
  
  pacienteForm: Paciente = { pacienteId: 0, nombre: '', apellido: '', fechaNacimiento: '', telefono: '' };
  doctorForm: Doctor = { doctorId: 0, nombre: '', apellido: '', especialidad: '', telefono: '' };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.cargarTodo();
  }

  async cargarTodo() {
    try {
      this.listaPacientes = await lastValueFrom(this.api.getPacientes());
      this.listaDoctores = await lastValueFrom(this.api.getDoctores());
      console.log("🕵️ PACIENTES DESDE .NET:", this.listaPacientes);
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Error al cargar datos", error);
    }
  }

  // ==========================================
  // --- LÓGICA DE PACIENTES ---
  // ==========================================
  async guardarPaciente() {
    try {
      if (this.pacienteForm.pacienteId === 0) {
        await lastValueFrom(this.api.crearPaciente(this.pacienteForm));
      } else {
        await lastValueFrom(this.api.actualizarPaciente(this.pacienteForm.pacienteId, this.pacienteForm));
      }
      this.limpiarPaciente();
      await this.cargarTodo();
    } catch (error) {
      alert("❌ Error al guardar el paciente");
    }
  }

  editarPaciente(p: Paciente) {
    const fechaFormateada = p.fechaNacimiento ? p.fechaNacimiento.split('T')[0] : '';
    this.pacienteForm = { ...p, fechaNacimiento: fechaFormateada };
    this.cdr.detectChanges();
  }

  async eliminarPaciente(id: number) {
    if(confirm("¿Seguro que deseas eliminar este paciente?")) {
      try {
        await lastValueFrom(this.api.borrarPaciente(id));
        await this.cargarTodo();
      } catch (error) {
        alert("❌ No se pudo eliminar el paciente.");
      }
    }
  }

  limpiarPaciente() {
    this.pacienteForm = { pacienteId: 0, nombre: '', apellido: '', fechaNacimiento: '', telefono: '' };
    this.cdr.detectChanges();
  }

  // ==========================================
  // --- LÓGICA DE DOCTORES ---
  // ==========================================
  async guardarDoctor() {
    try {
      if (this.doctorForm.doctorId === 0) {
        await lastValueFrom(this.api.crearDoctor(this.doctorForm));
      } else {
        await lastValueFrom(this.api.actualizarDoctor(this.doctorForm.doctorId, this.doctorForm));
      }
      this.limpiarDoctor();
      await this.cargarTodo();
    } catch (error) {
      alert("❌ Error al guardar el doctor");
    }
  }

  editarDoctor(d: Doctor) {
    this.doctorForm = { ...d };
    this.cdr.detectChanges();
  }

  async eliminarDoctor(id: number) {
    if(confirm("¿Seguro que deseas eliminar este doctor?")) {
      try {
        await lastValueFrom(this.api.borrarDoctor(id));
        await this.cargarTodo();
      } catch (error) {
        alert("❌ No se pudo eliminar el doctor.");
      }
    }
  }

  limpiarDoctor() {
    this.doctorForm = { doctorId: 0, nombre: '', apellido: '', especialidad: '', telefono: '' };
    this.cdr.detectChanges();
  }
}