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
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
