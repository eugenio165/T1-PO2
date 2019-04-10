import { Component } from '@angular/core';
import { DadosEntrada } from 'src/app/components/interpretador/interpretador.component';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-bissecao',
  templateUrl: './bissecao.component.html',
  styleUrls: ['./bissecao.component.scss']
})
export class BissecaoComponent {
  // Colunas para a tabela de iterações
  colunas = [ 'a', 'b', 'x', 'd1x'];
  // Quantidade de numeros apos a virgula para mostrar na tabela
  precisao: number;
  iteracoes: Array<object>;
  activated = false;
  interacoesMax;
  numeroInteracoes;
  erro;

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

    // Calcula a quantidade max de interações
    this.interacoesMax = Math.round(Math.log(dados.epsilon / (dados.b - dados.a)) / Math.log(1 / 2));
    this.numeroInteracoes = 0;
    this.erro = null;
    
    this.iteracoes = this.passo(dados.a, dados.b, dados.funcao);
    this.activated = false;

    // Desce a página até o final da tabela;
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Faz uma iteração do Busca Uniforme
  passo (a, b, funcao, iteracoes = []) {

    if (this.numeroInteracoes > this.interacoesMax ) {
      this.erro = 'Atingiu o numero máximo de iterações';
      return iteracoes;
    }

    const x = (a + b) / 2;

    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    const [arg] = funcao.params;
    const valorFuncao = {};

    // Cria objeto para passar pro parametro
    valorFuncao[arg] = x;

    // Derivada primeira de x
    const d1x = funcao.d1(valorFuncao);

    // Armazena os dados da iteração para ser mostrado
    iteracoes.push({a: a, b: b, x: x, d1x: d1x});
    
    // Condição de parada, derivada da primeira = 0
    if (Math.round(d1x) === 0) {
      return iteracoes;
    }

    // Incrementa numero de iteracoes
    this.numeroInteracoes ++;


    // Define o proximo intervalo
    if (Math.round(d1x) > 0) { // derivada da primeira > 0, a = x
        return this.passo(a, x, funcao, iteracoes);
    } else { // derivada da primeira > 0, b = x
        return this.passo(x, b, funcao, iteracoes);
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
