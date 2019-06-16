import { Options } from './../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { ModeloT2Component } from 'src/app/components/modelo-t2/modelo-t2.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-cilindricas',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class CilindricasComponent extends ModeloT2Component {
  titulo = 'Coordenadas Cíclicas';
  class = 'bg-gradient-info';
  opcoes: Options = { epsilon: true, x0: true, multi: true };
  colunas = [ 'x', 'fx', 'xk', 'fxk', 'delta'];
  activated = false;

  constructor() {
    super();
  }
  calculaDirecao(): number {

  }
  criterioDeParada(): boolean {
    // Gradiente de F(xk) => e


  }
  calculaXk(): number {

  }

  passo(a: number, b: number, iteracoes: object[], delta?: number, epsilon?: number, x0?: string): SaidaMetodo {
    // console.log(arguments);
    // console.log(this.arg);
    // console.log(this.funcao);
    // const pontoInicial = x0.split(',');
    // const numeros = pontoInicial.map(string => Number(string.trim()));
    // const y = [];
    // console.log(numeros)
    // let k = 0;
    // let xk = numeros;
    // // COndicao de parada
    // while(true) {
    //   k++;
    //   y[0] = xk;
    //   for (let k = 0; k < this.funcao.params.length; k ++) {

    //   }
    // }
    throw(1)
  }

}
