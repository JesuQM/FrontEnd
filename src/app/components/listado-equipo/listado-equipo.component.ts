import { Component } from '@angular/core';
import { Equipo } from 'src/app/model/Equipo';
import { HistorialEquipos } from 'src/app/model/Historial_equipo';
import { TipoEquipo } from 'src/app/model/Tipo-equipo';
import { EquiposService } from 'src/app/services/equipos.service';
import { HistorialEquipoService } from 'src/app/services/historial-equipo.service';
import { TipoEquipoService } from 'src/app/services/tipo-equipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-equipo',
  templateUrl: './listado-equipo.component.html',
  styleUrls: ['./listado-equipo.component.css']
})
export class ListadoEquipoComponent {
  listHistorial: HistorialEquipos[]=[]
  listEquipos:Equipo[]=[]
  listado:any[]=[]
  listadoSeleccionado:any;
  visible:boolean=false;
  tipoEquipo:TipoEquipo[]=[];
  selectEquipo:any;
  fechaRegistro :Date = new Date();
  filteredEquipos: Equipo[] = [];
  equipo: Equipo[]=[];
  equipoSelect?: Equipo;
  isSelect:boolean=false;
  valorMedido?:number;
  constructor(private historialEquiposService: HistorialEquipoService,
    private equiposService:EquiposService,
    private tipoEquipoService:TipoEquipoService){
  }
  async ngOnInit(){
    await this.historialEquiposService.getAllHistorial().subscribe(data=>{
      this.listHistorial=data;
    })
   await this.equiposService.getAllEquipo().subscribe(data=>{
      this.listEquipos=data
      this.equipo=data
      this.combineData()
    })
    await this.tipoEquipoService.getAllTipoEquipo().subscribe(data=>{
      this.tipoEquipo=data
    })
  }
  
  combineData() {
    this.listHistorial.forEach(historial => {
      let equipo = this.listEquipos.find(e => e.id === historial.equipo);
      let combinedData = {
        id:historial.id,
        equipo:historial.equipo,
        tipoEquipo:historial.tipoEquipo,
        descripcion: historial.descripcion,
        valorMedido: historial.valorMedido,
        fechaRegistro: historial.fechaRegistro,
        valorMinimo: equipo?.valorMinimo,
        valorMaximo: equipo?.valorMaximo,
        valorEsperado: equipo?.valorEsperado
      };
      this.listado.push(combinedData);
    });
  }
  onChangeTipEquipo(selectEquipo:any) {  
    this.filteredEquipos = this.equipo.filter(e => e.tipoEquipo === this.selectEquipo?.id);
    this.isSelect=true
}

  modal(listado:any){
    this.listadoSeleccionado=listado
    this.valorMedido=listado.valorMedido
    this.fechaRegistro=listado.fechaRegistro
    this.visible=true
  }
  cerrarModal(){
    this.visible=false
    this.resetForm()
  }


  actualizarDatos(){
    this.visible=false
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.visible=true
      }
    });
  }else{
    if(this.valorMedido==null||this.valorMedido==0){
      Swal.close()
      Swal.fire({
        title: 'Alerta',
        text: 'Debe escribir un valor de días que tiene que ser diferente de 0 ',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.visible=true
        }
      });
    }
  else{
    let infoHistorialEquipo: HistorialEquipos={}
      infoHistorialEquipo.id=this.listadoSeleccionado.id
      infoHistorialEquipo.equipo=this.equipoSelect?.id
      infoHistorialEquipo.tipoEquipo=this.equipoSelect?.tipoEquipo
      infoHistorialEquipo.descripcion=this.equipoSelect?.descripcion
      let fechaSeleccionada = new Date(this.fechaRegistro);
      let fechaUTC = new Date(fechaSeleccionada.getTime() + fechaSeleccionada.getTimezoneOffset() * 60000);
      infoHistorialEquipo.fechaRegistro=fechaUTC
      infoHistorialEquipo.valorMedido=this.valorMedido
      this.historialEquiposService.modificarHistorial(infoHistorialEquipo).subscribe(res=>{
        Swal.close()
        Swal.fire({
          text: 'La modificacion  se a realizado existosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.listado=[]
        this.resetForm();
        this.ngOnInit()
      })
  }

  }
  }
  cargardatos(){
     this.historialEquiposService.getAllHistorial().subscribe(data=>{
      this.listHistorial=data;
    })
    this.equiposService.getAllEquipo().subscribe(data=>{
      this.listEquipos=data
      this.equipo=data
      this.combineData()
    })
     this.tipoEquipoService.getAllTipoEquipo().subscribe(data=>{
      this.tipoEquipo=data
    })
  }

  resetForm() {
    this.listado=[]
    this.fechaRegistro = new Date();
    this.selectEquipo = [];
    //this.filteredEquipos = [];
    this.equipoSelect = undefined;
    this.isSelect = false;
    this.valorMedido = undefined;

  }
  getButtonStyle(valorMedido: number, valorMinimo: number, valorEsperado: number, valorMaximo: number): any {
    if (valorMedido < valorMinimo) {
      return { 'background-color': 'red' };
    } else if (valorMedido >= valorMinimo && valorMedido < valorEsperado) {
      return { 'background-color': 'yellow' };
    } else if (valorMedido >= valorEsperado && valorMedido <= valorMaximo) {
      return { 'background-color': 'green' };
    } else if (valorMedido > valorMaximo) {
      return { 'background-color': 'blue' };
    }
    return {};
  }

  deleteHistorial(id:number){
    Swal.fire({
      title: 'Alerta',
      text: '¿Esta seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Cargando',
        })
        Swal.showLoading()
         this.historialEquiposService.eliminarHistorial(id).subscribe(data=>{
          Swal.close()
            Swal.fire({
              text: 'La eliminacion se realizao  se a realizado existosamente',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            if (result.isConfirmed) {
              window.location.reload();   
            }

        })    
        this.listado=[]
        this.cargardatos();
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
   
          
      }
    });
  
    
  }
}
