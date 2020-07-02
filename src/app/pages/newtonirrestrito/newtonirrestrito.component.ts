import { Options } from './../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-newtonirrestrito',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class NewtonIrrestritoComponent extends MetodoComponent {


  titulo = 'Método de Newton Irrestrito';
  class = 'bg-gradient-danger';
  opcoes = { epsilon: true, intervalo: true };
  colunas = ['x', 'd1x', 'd2x', 'Xk_1'];
  xk = 0;

  constructor() {
    super();
  }

  passo(a: number, b: number, iteracoes: object[], delta?: number, epsilon?: number, x0?: string): SaidaMetodo {
    const pontoInicial = x0.split(',');
    const numeros = pontoInicial.map(string => Number(string.trim()));
    if (numeros.length !== this.funcao.params.length) {
        return { erro: 'O número de entradas no X0 nao bate com o numéro de variavéis na função!' };
    }

    // ================
    throw new Error("Method not implemented.");
  }


}
