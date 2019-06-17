import { Options } from '../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-ciclicas',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class CiclicasComponent extends MetodoComponent {
  titulo = 'Coordenadas Cíclicas';
  class = 'bg-gradient-info';
  opcoes: Options = { epsilon: true, x0: true, multi: true };
  colunas = [ 'j', 'Yj', 'Dj', 'Lambida', 'Yj1'];
  activated = false;

  constructor() {
    super();
  }

  pegaDirecaoClindricas(index) {
    const array = [];
    for (let i = 0; i < this.funcao.params.length; i++) {
      if (i === index - 1) {
        array.push(1);
      } else {
        array.push(0);
      }
    }
    return array;
  }

  passo(a: number, b: number, iteracoes: object[], delta?: number, epsilon?: number, x0?: string): SaidaMetodo {
    const pontoInicial = x0.split(',');
    const numeros = pontoInicial.map(string => Number(string.trim()));
    if (numeros.length !== this.funcao.params.length) {
      return { erro: 'O número de entradas no X0 nao bate com o numéro de variavéis na função!' };
    }
    console.log(this.funcao);

    var k = 0;
    var xk = numeros;
    var xk_1 = numeros.map(e => 10000);
    var sub = this.calculaSubtracao(xk_1, xk);
    // COndicao de parada
    while (this.calculaNormal(sub) >= epsilon) {
      k++;
      var y = [xk];
      var index = 1;
      for (index = 1; index <= this.funcao.params.length; index++) {
        const direcao = this.pegaDirecaoClindricas(index);
        let lambida;
        try {
          y.push(this.calculaY(y[index - 1], direcao));
          const func = this.calculaNovaFuncao(y[index]);
          lambida = this.newton(epsilon, func, 'd');
          y[index] = this.calculaY(y[index - 1], direcao, lambida);
          const obj = {};
          y[index].map((param, g) => {
            obj[this.funcao.params[g]] = param;
          });
          // console.log('Y Object: ', obj);
          // const val = this.funcao.eval(obj);
          xk_1 = y[index];
          // console.log('Func val: ', val);
        } catch (e) {
          return { erro: e};
        }
        iteracoes.push({j: index, Yj: y[index - 1], Dj: direcao, Lambida: lambida, Yj1: y[index] })
      }
      sub = this.calculaSubtracao(y[index - 1], xk);
      xk = y[index - 1];
    }
    return { i: iteracoes };
  }

}
