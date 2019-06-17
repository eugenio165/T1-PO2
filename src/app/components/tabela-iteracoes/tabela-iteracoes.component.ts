import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-iteracoes',
  templateUrl: './tabela-iteracoes.component.html',
  styleUrls: ['./tabela-iteracoes.component.scss']
})
export class TabelaIteracoesComponent {
  @Input() set colunas(col) {
    if (col.length) {
      col.map(string => this.colunasObj[string] = string);
      this.colunasKeys = Object.keys(this.colunasObj);
    } else {
      this.colunasObj = col;
      this.colunasKeys = Object.keys(this.colunasObj);
    }
  };
  @Input() iteracoes;
  @Input() precisao;
  @Input() erro;
  @Input() resultado;
  
  colunasObj = {};
  colunasKeys = [];

  constructor() { }

}
