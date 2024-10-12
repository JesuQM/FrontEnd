import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialEquipos } from '../model/Historial_equipo';

@Injectable({
  providedIn: 'root'
})
export class HistorialEquipoService {
  rutaHistorial = "http://localhost:8080/historial/";

  constructor(private http: HttpClient) { }

  //crear nuevo historial de producto
  crearNuevoHistorial(historialEquipo:HistorialEquipos){
    return this.http.post<HistorialEquipos>(this.rutaHistorial+'nuevoHistorial',historialEquipo)
    observe:'response'
  }

  //eliminar Historial
  eliminarHistorial(id:number){
   return this.http.post<Boolean>(this.rutaHistorial+id,{
    observe:'response'
   })
  }

  //listar todos los datos
  getAllHistorial(){
    return this.http.get<HistorialEquipos[]>(this.rutaHistorial+'listarHistorial')
  }
  modificarHistorial(historialEquipo:HistorialEquipos){
    return this.http.post<HistorialEquipos>(this.rutaHistorial+'modificarHistorial',historialEquipo)
    observe:'response'
  }

}
