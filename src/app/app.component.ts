import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items?: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Creación',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/creacion'
      },
      {
        label: 'Listado',
        icon: 'pi pi-fw pi-list',
        routerLink: '/listado'
      }
    ];
  }
}
