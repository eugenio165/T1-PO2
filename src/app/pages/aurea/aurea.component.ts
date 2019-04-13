import { Component } from '@angular/core';
import { MetodoComponent } from 'src/app/components/metodo/metodo.component';

@Component({
  selector: 'app-aurea',
  // Usa o html e css do metodo component
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class AureaComponent extends MetodoComponent {
  // Titulo do componente
  titulo = 'Seção Áurea';
  // Classe do fundo
  class = 'bg-gradient-info';
  // Opções do interpretador;
  opcoes = { epsilon: true, intervalo: true };
  // Colunas para a tabela de iterações
  colunas = [ 'a', 'b', 'u', 'y', 'fu', 'fy'];

  constructor() {
    super();
  }

  // Faz uma iteração do Seção Áurea
  passo (a, b, iteracoes = [], delta, epsilon) {
    const u = this.limitaPrecisao(a + 0.382 * (b - a));
    const y = this.limitaPrecisao(a + 0.618 * (b - a));

    // Para usar na eval da função
    // Cria um objeto como {'x': 10}; para passar pro eval do Math.js
    const valorU = {};
    valorU[this.arg] = u;

    const valorY = {};
    valorY[this.arg] = y;

    // Calcula os valores das funções passando o objeto criado anteriormente
    const fu = this.limitaPrecisao(this.funcao.eval(valorU));
    const fy = this.limitaPrecisao(this.funcao.eval(valorY));

    // Armazena os dados da iteração no objeto
    iteracoes.push({a: a, b: b, u: u, y: y, fu: fu, fy: fy});

    if (Math.abs(b - a) < epsilon) {
      const resString = 'X* = ' + this.limitaPrecisao((a + b) / 2);
      return {i: iteracoes, res: resString};
    } if (fu > fy) {
      return this.passo(u, b, iteracoes, delta, epsilon);
    } else {
      return this.passo(a, y, iteracoes, delta, epsilon);
    }
  }

}
