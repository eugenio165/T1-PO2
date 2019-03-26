import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'T1-PO2';
  pessoas = [
    {
      nome: 'Antonio Eugenio',
      ocupacao: 'Desenvolvedor ANgular',
    },
    {
      nome: 'Gabriel Facul',
      ocupacao: 'Desenvolvedor Java',
    },
    {
      nome: 'Bambu',
      ocupacao: 'Maconheiro',
    },
  ];
}
