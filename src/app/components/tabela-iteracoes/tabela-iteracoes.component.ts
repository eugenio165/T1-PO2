import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-iteracoes',
  templateUrl: './tabela-iteracoes.component.html',
  styleUrls: ['./tabela-iteracoes.component.scss']
})
export class TabelaIteracoesComponent {
  @Input() colunas;
  @Input() iteracoes;
  @Input() precisao;

  constructor() { }

}
