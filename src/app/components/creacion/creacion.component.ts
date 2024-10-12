import { EquiposService } from './../../services/equipos.service';
import { Equipo } from './../../model/Equipo';
import { TipoEquipo } from 'src/app/model/Tipo-equipo';
import { TipoEquipoService } from './../../services/tipo-equipo.service';
import { Component } from '@angular/core';
import { HistorialEquipoService } from 'src/app/services/historial-equipo.service';
import { HistorialEquipos } from 'src/app/model/Historial_equipo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})
export class CreacionComponent {
  fechaRegistro :Date = new Date();
  tipoEquipo: TipoEquipo[] = [];
  selectEquipo: any;
  filteredEquipos: Equipo[] = [];
  equipo: Equipo[]=[];
  equipoSelect?: Equipo;
  isSelect:boolean=false;
  valorMedido?:number;

  constructor(private tipoEquipoService:TipoEquipoService,
    private equiposService: EquiposService,
    private historialEquipoService:HistorialEquipoService){}
  ngOnInit(){
    this.tipoEquipoService.getAllTipoEquipo().subscribe(data=>{
      this.tipoEquipo=data
    })
    this.equiposService.getAllEquipo().subscribe(data=>{
      this.equipo=data
    })
  }
  onChangeTipEquipo() {
    if(this.selectEquipo && this.selectEquipo.id !== undefined) {
      this.filteredEquipos = this.equipo.filter(e => e.tipoEquipo === this.selectEquipo.id);
    this.isSelect=true

  }
  
}
crearHistorial(){
  Swal.fire({
          text: 'Cargando',
  })
  Swal.showLoading()
    if(!this.equipoSelect){
      Swal.close()
      Swal.fire({
        title: 'Alerta',
        text: 'Debe seleccionar un equipo ',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }else{
      if(this.valorMedido==null||this.valorMedido==0){
        Swal.close()
        Swal.fire({
          title: 'Alerta',
          text: 'Debe escribir un valor de dias que tiene que ser diferente de 0 ',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    else{
      let infoHistorialEquipo: HistorialEquipos={}
        infoHistorialEquipo.equipo=this.equipoSelect?.id
        infoHistorialEquipo.tipoEquipo=this.equipoSelect?.tipoEquipo
        infoHistorialEquipo.descripcion=this.equipoSelect?.descripcion
        infoHistorialEquipo.fechaRegistro=this.fechaRegistro  
        infoHistorialEquipo.valorMedido=this.valorMedido
        this.historialEquipoService.crearNuevoHistorial(infoHistorialEquipo).subscribe(res=>{
          Swal.close()
          Swal.fire({
            text: 'El registro se a realizado existosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.resetForm();
        })
    }
  
    }
    
}


resetForm() {
  this.fechaRegistro = new Date();
  this.selectEquipo = undefined;
  this.filteredEquipos = [];
  this.equipoSelect = undefined;
  this.isSelect = false;
  this.valorMedido = undefined;

     
}
}
