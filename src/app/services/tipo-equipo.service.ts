import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoEquipo } from '../model/Tipo-equipo';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipoService {
  rutaTipo = "http://localhost:8080/tipoEquipo/";

  constructor(private http: HttpClient) {}

  getAllTipoEquipo() {
    return this.http.get<TipoEquipo[]>(this.rutaTipo + 'listEquipo');
  }
}