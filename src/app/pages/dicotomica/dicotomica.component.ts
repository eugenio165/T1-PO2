import { MetodoComponent } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dicotomica',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class DicotomicaComponent extends MetodoComponent {
  titulo = 'Busca Dicotômica';
  class = 'bg-gradient-default';
  opcoes = { delta: true, epsilon: true, intervalo: true };
  colunas = [ 'a', 'b', 'x', 'z', 'fx', 'fz'];

  constructor() {
    super();
  }

  // Faz uma iteração da Busca Dicotômica
  passo (a, b, iteracoes = [], delta, epsilon) {
    const media = this.limitaPrecisao((a + b) / 2);
    const x = (media) - delta;
    const z = (media) + delta;

    // Para usar na eval da função x
    const valorX = {};
    valorX[this.arg] = x;

    // Para usar na eval da funcao z
    const valorZ = {};
    valorZ[this.arg] = z;

    const fx = this.limitaPrecisao(this.funcao.eval(valorX));
    const fz = this.limitaPrecisao(this.funcao.eval(valorZ));

    iteracoes.push({a: a, b: b, x: x, z: z, fx: fx, fz: fz});

    // Condição de parada
    if (Math.abs(b - a) < epsilon) {
      const resString = 'X* = ' + media;
      return {i: iteracoes, res: resString};
      // Se f(x) > f(z)
    } else if (fx > fz) {
      return this.passo(x, b, iteracoes, delta, epsilon);
    } else {
      return this.passo(a, z, iteracoes, delta, epsilon);
    }
  }

}
