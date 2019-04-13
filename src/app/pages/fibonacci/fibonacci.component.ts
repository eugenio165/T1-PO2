import { Component, OnInit } from '@angular/core';
import { MetodoComponent } from 'src/app/components/metodo/metodo.component';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class FibonacciComponent extends MetodoComponent {
  titulo = 'Método Fibonacci';
  class = 'bg-gradient-default';
  colunas = ['a', 'b', 'u', 'y', 'fu', 'fy'];
  opcoes = {intervalo: true, epsilon: true};

  constructor() {
    super();
  }

  geraFibonacci(x) {
    if (x < 3) {
      return 1;
    } else {
      return this.geraFibonacci(x - 1) + this.geraFibonacci(x - 2);
    }
  }

  calculaNBuscaFibonacci(a, b, epsilon) {
    if (epsilon === 0) {
      return 0;
    }
    const resultado = Math.abs((b - a) / epsilon);
    let N = 1;
    while (this.geraFibonacci(N) < resultado) {
      N++;
    }
    return N;
  }

  passo(a, b, iteracoes, delta, epsilon) {
    const N = this.calculaNBuscaFibonacci(a, b, epsilon);
    if (N === 0) {
      return {erro: 'Impossível calcular com os dados inseridos', i: null, res: null};
    }
    // N-1 iteracoes para achar o resultado
    let A = a, B = b, y, u;
    y = a + (this.geraFibonacci(N - 2) / this.geraFibonacci(N - 1)) * (b - a);
    u = a + (this.geraFibonacci(N - 3) / this.geraFibonacci(N - 1)) * (b - a);
    for (let i = 1; i < N; i++) {
      const valorU = {};
      valorU[this.arg] = u;

      const valorY = {};
      valorY[this.arg] = y;

      const fu = this.limitaPrecisao(this.funcao.eval(valorU));
      const fy = this.limitaPrecisao(this.funcao.eval(valorY));
      iteracoes.push({a: A, b: B, u: u, y: y, fu: fu, fy: fy});
      if (fu > fy) {
        A = u;
        u = y;
        y = A + (this.geraFibonacci(N - i - 1) / this.geraFibonacci(N - i)) * (B - A);
      } else {
        B = y;
        y = u;
        u = A + (this.geraFibonacci(N - i - 2) / this.geraFibonacci(N - i)) * (B - A);
      }
    }
    const resultado = this.limitaPrecisao((A + B) / 2);
    return {i: iteracoes, res: 'X* = ' + resultado, erro: null};
  }

}
