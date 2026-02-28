import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  pacienteId: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
}

export interface Doctor {
  doctorId: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://localhost:7116/api'; 

  constructor(private http: HttpClient) { }

  // --- PACIENTES ---
  getPacientes(): Observable<Paciente[]> { return this.http.get<Paciente[]>(`${this.apiUrl}/Pacientes`); }
  crearPaciente(p: Paciente) { return this.http.post(`${this.apiUrl}/Pacientes`, p); }
  actualizarPaciente(id: number, p: Paciente) { return this.http.put(`${this.apiUrl}/Pacientes/${id}`, p); }
  borrarPaciente(id: number) { return this.http.delete(`${this.apiUrl}/Pacientes/${id}`); }

  // --- DOCTORES ---
  getDoctores(): Observable<Doctor[]> { return this.http.get<Doctor[]>(`${this.apiUrl}/Doctores`); }
  crearDoctor(d: Doctor) { return this.http.post(`${this.apiUrl}/Doctores`, d); }
  actualizarDoctor(id: number, d: Doctor) { return this.http.put(`${this.apiUrl}/Doctores/${id}`, d); }
  borrarDoctor(id: number) { return this.http.delete(`${this.apiUrl}/Doctores/${id}`); }
}