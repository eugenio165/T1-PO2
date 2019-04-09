import { DadosEntrada } from './../../components/interpretador/interpretador.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscauniforme',
  templateUrl: './buscauniforme.component.html',
  styleUrls: ['./buscauniforme.component.scss']
})
export class BuscauniformeComponent {
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

  calcularBuscaUniforme(dados: DadosEntrada, div) {
    try {
      this.precisao = dados.delta.toString().split('.')[1].length;
    } catch (e) {
      this.precisao = 2;
    }
    this.iteracoes = this.passo(dados.a, dados.b, dados.delta, dados.funcao);
    this.activated = false;

    // Desce a página até o final da tabela;
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Faz uma iteração do Busca Uniforme
  passo (a, b, delta, funcao, iteracoes = []) {
    // Inicia x no ponto a
    let x = a;

    // Para usar na eval da função
    const obj = {};
    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    const [arg] = funcao.params;
    obj[arg] = x;

    let xanterior = x;

    while (true) {
      // F(x)
      const fx = funcao.eval(obj);

      // xk
      const xk = x + delta;
      const newObj = {};
      newObj[arg] = xk;

      // F(xk)
      const fxk = funcao.eval(newObj);

      // Armazena os dados da iteração para ser mostrado
      iteracoes.push({x: x, fx: fx, xk: xk, fxk: fxk, delta: delta});

      if (xk > b) {
        return iteracoes;
      } else if (fxk > fx) {
        if (!this.activated) {
          this.activated = true;
          return this.passo(xanterior, b, delta / 10, funcao, iteracoes);
        } else {
          return iteracoes;
        }
      }
      // Armazena para voltar
      xanterior = x;

      // Novo X
      x = xk;
      obj[arg] = x;
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
