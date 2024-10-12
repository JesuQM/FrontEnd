import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Equipo } from '../model/Equipo';
@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  rutaEquipo= "http://localhost:8080/equipo/";
  constructor(private http:HttpClient) {}
  
  getAllEquipo() {
    return this.http.get<any[]>(this.rutaEquipo + 'listarEquipo');
}


}
