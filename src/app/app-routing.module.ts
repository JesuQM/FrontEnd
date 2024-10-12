import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionComponent } from './components/creacion/creacion.component';
import { ListadoEquipoComponent } from './components/listado-equipo/listado-equipo.component';

const routes: Routes = [
  { path: 'creacion', component: CreacionComponent },
  { path: 'listado', component: ListadoEquipoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
