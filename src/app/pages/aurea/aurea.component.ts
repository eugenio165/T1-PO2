import { DadosEntrada } from 'src/app/components/interpretador/interpretador.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aurea',
  templateUrl: './aurea.component.html',
  styleUrls: ['./aurea.component.scss']
})
export class AureaComponent {
  // Colunas para a tabela de iterações
  colunas = [ 'a', 'b', 'u', 'y', 'fu', 'fy'];
  // Quantidade de numeros apos a virgula para mostrar na tabela
  precisao: number;
  iteracoes: Array<object>;
  arg;
  erro;
  res;

  constructor() { }

  // Limpa as iterações para nao mostrar a tabela
  clear() {
    this.iteracoes = null;
  }

  calcularSecaoAurea(dados: DadosEntrada, div) {
    try {
      this.precisao = dados.delta.toString().split('.')[1].length;
      this.precisao = (this.precisao >= 4) ? this.precisao : 4;
    } catch (e) {
      this.precisao = 4;
    }
    this.erro = null;
    this.res = null;
    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    this.arg = dados.funcao.params;
    this.iteracoes = this.passo(dados.a, dados.b, dados.epsilon, dados.funcao);
    // Desce a página até o final da tabela;
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Faz uma iteração do Seção Áurea
  passo (a, b, epsilon, funcao, iteracoes = []) {
    // Limita a precisao dos floats para ter resultados consistentes.
    const limitaPrecisao = (num: Number) => Number(num.toFixed(this.precisao));
    const u = limitaPrecisao(a + 0.382 * (b - a));
    const y = limitaPrecisao(a + 0.618 * (b - a));

    // Para usar na eval da função
    const valorU = {};
    valorU[this.arg] = u;

    const valorY = {};
    valorY[this.arg] = y;

    const fu = limitaPrecisao(funcao.eval(valorU));
    const fy = limitaPrecisao(funcao.eval(valorY));

    iteracoes.push({a: a, b: b, u: u, y: y, fu: fu, fy: fy});

    if (Math.abs(b - a) < epsilon) {
      const res = (a + b) / 2;
      this.res = 'X* = ' + limitaPrecisao(res);
      return iteracoes;
    } if (fu > fy) {
      return this.passo(u, b, epsilon, funcao, iteracoes);
    } else {
      return this.passo(a, y, epsilon, funcao, iteracoes);
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
