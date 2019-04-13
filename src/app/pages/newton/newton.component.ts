import { MetodoComponent } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import { DadosEntrada } from 'src/app/components/interpretador/interpretador.component';

@Component({
  selector: 'app-newton',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class NewtonComponent extends MetodoComponent {
  titulo = 'Método de Newton';
  class = 'bg-gradient-danger';
  opcoes = { epsilon: true, intervalo: true };
  colunas = [ 'x', 'd1x', 'd2x', 'Xk_1'];
  xk = 0;

  constructor() {
    super();
  }

  // Faz uma iteração do Busca Uniforme
  passo (a, b, iteracoes = [], delta, epsilon) {
    this.xk = (this.xk === 0) ? a : this.xk;
    // Objeto para passar pra funcao avaliar o resultado
    const valorFuncao = {};
    valorFuncao[this.arg] = this.xk;

    // Derivada primeira de xk
    const d1x = this.limitaPrecisao(this.funcao.d1(valorFuncao));
    // Derivada segunda de xk
    const d2x = this.limitaPrecisao(this.funcao.d2(valorFuncao));

    // xk+1 - calcula xk+1 com os valores do xk
    const xk_1 = this.limitaPrecisao(this.xk - (d1x / d2x));

    // Armazena os dados da iteração para ser mostrado
    iteracoes.push({x: this.xk, d1x: d1x, d2x: d2x, Xk_1: xk_1});

    // Seta scope com xk_1 para usar na função
    const valorXk_1 = {};
    valorXk_1[this.arg] = xk_1;

    // Se |f(XK+1)| < Epsilon, para
    if (this.xk < a || this.xk > b) {
      // Seta erro pra mostrar na tabela
      this.xk = 0;
      return {i: iteracoes, res: 'X* = ' + this.xk};
    } else if (Math.abs(this.funcao.eval(valorXk_1)) < epsilon) {
      this.xk = 0;
      return {i: iteracoes, res: 'X* = ' + xk_1};
    } else {
      const divisor = (Math.abs(xk_1) > 1) ? Math.abs(xk_1) : 1;
      if ( Math.abs(xk_1 - this.xk) / divisor < epsilon) {
        this.xk = 0;
        return {i: iteracoes, res: 'X* = ' + xk_1};
      }
      this.xk = xk_1;
      return this.passo(a, b, iteracoes, delta, epsilon);
    }
  }

}
