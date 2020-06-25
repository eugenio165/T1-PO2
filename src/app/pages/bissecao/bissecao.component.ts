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
  numeroInteracoes = 0;

  constructor() {
    super();
  }

  limpaVariaveis() {
    this.numeroInteracoes = 0;
    this.interacoesMax = null;
  }

  // Faz uma iteração do Método da Bisseção
  passo (a, b, iteracoes = []) {
    // Se estiver na primeira iteração, calcule o número máximo de iterações
    if (this.numeroInteracoes === 0) {
      let n = 1;
      while (Math.pow(0.5, n) > this.entrada.epsilon / (this.entrada.b - this.entrada.a) ) {
        n++;
      }
      this.interacoesMax = n;
    }

    const x = this.limitaPrecisao((a + b) / 2);

    // Cria objeto para passar pro parametro
    const valorFuncao = {};
    valorFuncao[this.arg] = x;

    // Derivada primeira de x
    const d1x = this.limitaPrecisao(this.funcao.d1(valorFuncao));

    // Armazena os dados da iteração para ser mostrado
    iteracoes.push({a: a, b: b, x: x, d1x: d1x});

    // Condição de parada, derivada da primeira = 0 (com precisão de 0.009)
    if (Math.abs(d1x) - 0.009 < 0) {
      const resString = 'X* = ' + this.limitaPrecisao((a + b) / 2);
      this.limpaVariaveis();
      return {i: iteracoes, res: resString};
    } else if (this.numeroInteracoes === this.interacoesMax ) {
      const resString = 'X* = ' + this.limitaPrecisao((a + b) / 2) + ' (atingiu número máximo de iterações)';
      this.limpaVariaveis();
      return {i: iteracoes, res: resString};
    }

    // Incrementa numero de iteracoes
    this.numeroInteracoes ++;
    if (this.numeroInteracoes > 500) {
      this.limpaVariaveis();
      return {i: iteracoes, erro: 'Não convergiu!'};
    }

    // Define o proximo intervalo
    // Precisão de 0.009 para igualar a 0
    if (Math.abs(d1x) - 0.009 > 0 && Math.sign(d1x) === 1) { // derivada da primeira > 0, a = x
      return this.passo(a, x, iteracoes);
    } else { // derivada da primeira > 0, b = x
      return this.passo(x, b, iteracoes);
    }
  }

}
