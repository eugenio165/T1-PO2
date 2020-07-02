import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public T1 = [
    { path: '/buscauniforme', title: 'Busca Uniforme',  icon: 'ni-zoom-split-in text-danger', class: '' },
    { path: '/newton', title: 'Método de Newton',  icon: 'ni-align-left-2 text-primary', class: '' },
    { path: '/bissecao', title: 'Método da Bisseção',  icon: 'ni-scissors text-info', class: '' },
    { path: '/dicotomica', title: 'Busca Dicotômica',  icon: 'ni-vector text-warning upside-down', class: '' },
    { path: '/aurea', title: 'Seção Áurea',  icon: 'ni-chart-pie-35 text-warning', class: '' },
    { path: '/fibonacci', title: 'Método Fibonacci',  icon: 'ni-chart-bar-32 text-default', class: '' },
  ];
  public T2 = [
    { path: '/coordenadas-ciclicas', title: 'Coordenadas Cíclicas',  icon: 'ni-planet text-danger', class: '' },
    { path: '/hooke&jeeves', title: 'Hooke & Jeeves',  icon: 'ni-map-big text-primary', class: '' },
    { path: '/gradiente', title: 'Gradiente',  icon: 'ni-compass-04 text-info', class: '' },
    { path: '/newton-irrestrito', title: 'Newton Irrestrito',  icon: 'ni-chart-bar-32 text-warning upside-down', class: '' },
    { path: '/gradiente-conjugado', title: 'Gradiente Conjugado Generalizado',  icon: 'ni-chart-pie-35 text-warning', class: '' },
    // { path: '/fletcher&reeves', title: 'Fletcher & Reeves',  icon: 'ni-ruler-pencil text-warning', class: '' },
    // { path: '/fletcher-powell', title: 'Davidon-Fletcher-Powell',  icon: 'ni-spaceship text-default', class: '' },
  ]
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
