import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoEquipoComponent } from './components/listado-equipo/listado-equipo.component';
import { CreacionComponent } from './components/creacion/creacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//primeng
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
 
  imports: [
    DropdownModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    FieldsetModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    ListadoEquipoComponent,
    CreacionComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
