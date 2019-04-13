import { Component } from '@angular/core';
import { MetodoComponent } from 'src/app/components/metodo/metodo.component';

@Component({
  selector: 'app-bissecao',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class BissecaoComponent extends MetodoComponent {
  titulo = 'Método da Bisseção';
  class = 'bg-gradient-info';
  opcoes = { intervalo: true, delta: false, epsilon: true };
  // Colunas para a tabela de iterações
  colunas = [ 'a', 'b', 'x', 'd1x'];
  interacoesMax;
  numeroInteracoes;

  constructor() {
    super();
  }

  // Faz uma iteração do Método da Bisseção
  passo (a, b, iteracoes = []) {

    if (this.numeroInteracoes > this.interacoesMax ) {
      return {i: iteracoes, erro: 'Atingiu o numero máximo de iterações'};
    }

    const x = this.limitaPrecisao((a + b) / 2);

    // Cria objeto para passar pro parametro
    const valorFuncao = {};
    valorFuncao[this.arg] = x;

    // Derivada primeira de x
    const d1x = this.limitaPrecisao(this.funcao.d1(valorFuncao));

    // Armazena os dados da iteração para ser mostrado
    iteracoes.push({a: a, b: b, x: x, d1x: d1x});

    // Condição de parada, derivada da primeira = 0
    if (Math.round(d1x) === 0) {
      const resString = 'X* = ' + this.limitaPrecisao((a + b) / 2);
      return {i: iteracoes, res: resString};
    }

    // Incrementa numero de iteracoes
    this.numeroInteracoes ++;

    // Define o proximo intervalo
    if (Math.round(d1x) > 0) { // derivada da primeira > 0, a = x
      return this.passo(a, x, iteracoes);
    } else { // derivada da primeira > 0, b = x
      return this.passo(x, b, iteracoes);
    }
  }

}
