import { MetodoComponent } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscauniforme',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class BuscauniformeComponent extends MetodoComponent {
  titulo = 'Busca Uniforme';
  class = 'bg-gradient-info';
  opcoes = { delta: true, epsilon: false, intervalo: true };
  colunas = [ 'x', 'fx', 'xk', 'fxk', 'delta'];
  activated = false;

  constructor() {
    super();
  }

  // Faz uma iteração do Busca Uniforme
  passo (a, b, iteracoes, delta) {
    // Inicia x no ponto a
    let x = this.limitaPrecisao(a);

    // Para usar na eval da função
    const valorX = {};
    valorX[this.arg] = x;

    let xanterior = x;

    while (true) {
      // F(x)
      const fx = this.limitaPrecisao(this.funcao.eval(valorX));

      // xk
      const xk = x + delta;
      const valorXK = {};
      valorXK[this.arg] = xk;

      // F(xk)
      const fxk = this.limitaPrecisao(this.funcao.eval(valorXK));

      // Armazena os dados da iteração para ser mostrado
      iteracoes.push({x: x, fx: fx, xk: xk, fxk: fxk, delta: delta});

      if (xk > b) {
        this.activated = false;
        return {i: iteracoes, erro: 'Erro! Fora do Intervalo!'};
      } else if (fxk > fx) {
        if (!this.activated) {
          this.activated = true;
          return this.passo(xanterior, b, iteracoes, delta / 10);
        } else {
          const resString = 'X* = ' + x;
          this.activated = false;
          return {i: iteracoes, res: resString};
        }
      }
      // Armazena para voltar
      xanterior = x;

      // Novo X
      x = xk;
      valorX[this.arg] = x;
    }
  }

}
