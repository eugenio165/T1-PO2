import { Component } from '@angular/core';
import { DadosEntrada } from 'src/app/components/interpretador/interpretador.component';

@Component({
  selector: 'app-newton',
  templateUrl: './newton.component.html',
  styleUrls: ['./newton.component.scss']
})
export class NewtonComponent {
  // Colunas para a tabela de iterações
  colunas = [ 'x', 'd1x', 'd2x', 'Xk_1'];
  // Quantidade de numeros apos a virgula para mostrar na tabela
  precisao: number;
  iteracoes: Array<object>;
  activated = false;
  arg;
  erro;

  constructor() { }

  // Limpa as iterações para nao mostrar a tabela
  clear() {
    this.iteracoes = null;
  }

  calcularNewton(dados: DadosEntrada, div) {
    try {
      this.precisao = dados.epsilon.toString().split('.')[1].length;
      this.precisao = (this.precisao >= 4) ? this.precisao : 4;
    } catch (e) {
      this.precisao = 2;
    }
    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    [this.arg] = dados.funcao.params;
    // Zera o erro da tabela
    this.erro = null;
    this.iteracoes = this.passo(dados.a, dados.b, dados.a, dados.epsilon, dados.funcao);

    // Desce a página até o final da tabela;
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Faz uma iteração do Busca Uniforme
  passo (a, b, xk, epsilon, funcao, iteracoes = []) {
    // Objeto para passar pra funcao avaliar o resultado
    const valorFuncao = {};
    valorFuncao[this.arg] = xk;

    // Derivada primeira de xk
    const d1x = funcao.d1(valorFuncao);
    // Derivada segunda de xk
    const d2x = funcao.d2(valorFuncao);

    // xk+1 - calcula xk+1 com os valores do xk
    const xk_1 = xk - (d1x / d2x);

    // Armazena os dados da iteração para ser mostrado
    iteracoes.push({x: xk, d1x: d1x, d2x: d2x, Xk_1: xk_1});

    // Seta scope com xk_1 para usar na função
    const valorXk_1 = {};
    valorXk_1[this.arg] = xk_1;

    // Se |f(XK+1)| < Epsilon, para
    if (xk < a || xk > b) {
      // Seta erro pra mostrar na tabela
      this.erro = 'Erro! Fora do Intervalo!';
      return iteracoes;
    } else if (Math.abs(funcao.eval(valorXk_1)) < epsilon) {
      return iteracoes;
    } else {
      const divisor = (Math.abs(xk_1) > 1) ? Math.abs(xk_1) : 1;
      if ( Math.abs(xk_1 - xk) / divisor < epsilon) {
        return iteracoes;
      }

      return this.passo(a, b, xk_1, epsilon, funcao, iteracoes);
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
