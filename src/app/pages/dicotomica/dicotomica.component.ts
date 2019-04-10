import { DadosEntrada } from './../../components/interpretador/interpretador.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dicotomica',
  templateUrl: './dicotomica.component.html',
  styleUrls: ['./dicotomica.component.scss']
})
export class DicotomicaComponent {
  // Colunas para a tabela de iterações
  colunas = [ 'a', 'b', 'x', 'z', 'fx', 'fz'];
  // Quantidade de numeros apos a virgula para mostrar na tabela
  precisao: number;
  iteracoes: Array<object>;
  arg;

  constructor() { }

  // Limpa as iterações para nao mostrar a tabela
  clear() {
    this.iteracoes = null;
  }

  calcularBuscaUniforme(dados: DadosEntrada, div) {
    try {
      this.precisao = dados.delta.toString().split('.')[1].length;
      this.precisao = (this.precisao >= 4) ? this.precisao : 4;
    } catch (e) {
      this.precisao = 4;
    }
    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    [this.arg] = dados.funcao.params;
    this.iteracoes = this.passo(dados.a, dados.b, dados.delta, dados.epsilon, dados.funcao);
    // Desce a página até o final da tabela;
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Faz uma iteração da Busca Dicotômica
  passo (a, b, delta, epsilon, funcao, iteracoes = []) {
    const media = (a + b) / 2;
    const x = (media) - delta;
    const z = (media) + delta;

    // Para usar na eval da função x
    const valorX = {};
    valorX[this.arg] = x;

    // Para usar na eval da funcao z
    const valorZ = {};
    valorZ[this.arg] = z;

    const fx = funcao.eval(valorX);
    const fz = funcao.eval(valorZ);

    iteracoes.push({a: a, b: b, x: x, z: z, fx: fx, fz: fz});

    // Condição de parada
    if (Math.abs(b - a) < epsilon) {
      return iteracoes;
      // Se f(x) > f(z)
    } else if (fx > fz) {
      return this.passo(x, b, delta, epsilon, funcao, iteracoes);
    } else {
      return this.passo(a, z, delta, epsilon, funcao, iteracoes);
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
