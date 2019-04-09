import { Component } from '@angular/core';
import { DadosEntrada } from 'src/app/components/interpretador/interpretador.component';

@Component({
  selector: 'app-bissecao',
  templateUrl: './bissecao.component.html',
  styleUrls: ['./bissecao.component.scss']
})
export class BissecaoComponent {
  // Colunas para a tabela de iterações
  colunas = [ 'x', 'fx', 'xk', 'fxk', 'delta'];
  // Quantidade de numeros apos a virgula para mostrar na tabela
  precisao: number;
  iteracoes: Array<object>;
  activated = false;

  constructor() { }

  // Limpa as iterações para nao mostrar a tabela
  clear() {
    this.iteracoes = null;
  }

  calcularBissecao(dados: DadosEntrada, div) {
    try {
      this.precisao = dados.delta.toString().split('.')[1].length;
    } catch (e) {
      this.precisao = 2;
    }
    this.iteracoes = this.passo(dados.a, dados.b, dados.epsilon, dados.x0, dados.funcao);
    this.activated = false;

    // Desce a página até o final da tabela;
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Faz uma iteração do Busca Uniforme
  passo (a, b, epsilon, x0, funcao, iteracoes = []) {
    let xk = x0;

    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    const [arg] = funcao.params;
    const valorFuncao = {};

    // Cria objeto para passar pro parametro
    valorFuncao[arg] = xk;

    // Derivada primeira de xk
    const d1x = funcao.d1(valorFuncao);
    // Derivada segunda de xk
    const d2x = funcao.d2(valorFuncao);

    // xk+1 - calcula xk+1 com os valores do xk
    const xk_1 = xk - (d1x / d2x);

    // Armazena os dados da iteração para ser mostrado
    iteracoes.push({x: xk, d1x: d1x, d2x: d2x, xk_1: xk_1});

    // Seta scope com xk_1 para usar na função
    const valorXk_1 = {};
    valorXk_1[arg] = xk_1;

    // Se |f(XK+1)| < Epsilon, para
    if (Math.abs(funcao.eval(valorXk_1)) < epsilon) {
      return iteracoes;
    } else {
      const divisor = (Math.abs(xk_1) > 1) ? Math.abs(xk_1) : 1;
      if ( Math.abs(xk_1 - xk) / divisor < epsilon) {
        return iteracoes;
      }

      return this.passo(a, b, epsilon, xk, funcao, iteracoes);
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
