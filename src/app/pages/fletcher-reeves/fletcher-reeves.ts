import {
  Options,
  DadosEntrada,
} from './../../components/interpretador/interpretador.component';
import {
  MetodoComponent,
  SaidaMetodo,
} from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-fletcher-reeves',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class FletcherReevesComponent extends MetodoComponent {
  titulo = 'Fletcher & Reeves';
  class = 'bg-gradient-default';
  opcoes: Options = { epsilon: true, x0: true, multi: true };
  precisao = 6;
  colunas = {
    k: 'k',
    xk: 'Xk',
    lambda: 'lambda',
    normal: '||▽f(Xk)||',
    d: 'd',
  };
  // this: any;
  limitaPrecisao(num: number): number {
    return Number(num.toFixed(this.precisao));
  }

  passo(
    a: number,
    b: number,
    iteracoes: object[],
    delta,
    epsilon: number,
    x0?: string
  ): SaidaMetodo {
    const pontoInicial = x0.split(',');
    const numeros = pontoInicial.map((string) => Number(string.trim()));

    const sl: number[] = [0, 0];
    console.log('teste: ', JSON.parse(JSON.stringify(sl)));
    console.log('vish');
    const resposta = this.fleetcher(
      numeros,
      epsilon,
      this.funcao.params.length,
      iteracoes
    );
    console.log(resposta);
    return resposta;
  }
  vish(x: number[]) {
    return x.map((elemento) => [elemento]);
  }
  bla(x: number[][]) {
    return x.map((elemento, i) => elemento[0]);
  }
  calculaD(xRaw, xk_1Raw, dRaw) {
    const gRaw = this.calculaGradiente(xRaw);
    const gkRaw = this.calculaGradiente(xk_1Raw);

    const g = this.vish(gRaw);
    const gk = this.vish(gkRaw);

    const gt = this.transposta(g);
    const gkt = this.transposta(gk);
    const numeradorBeta = this.transformMatrxToScalar(this.multiply(gkt, gk));
    const denominadorBeta = this.transformMatrxToScalar(this.multiply(gt, g));
    const beta = numeradorBeta / denominadorBeta;

    let d = this.vish(dRaw);

    const betaVezesD = this.multiplyByScalar(d, beta);
    const menosGk = this.multiplyByScalar(gk, -1);
    d = this.SomaMatrizes(menosGk, betaVezesD);
    console.log('d:', d, 'b', beta);
    return this.bla(d);
  }
  fleetcher = (x, epsilon, n, iteracoes) => {
    let gradiente = this.calculaGradiente(x);
    let d = this.bla(this.multiplyByScalar(this.vish(gradiente), -1));
    let normal = this.calculaNormal(gradiente);
    let seila = 0;
    while (normal > epsilon && seila < 100) {
      for (let i = 0; i < n - 1; i++) {
        const novoY = this.calculaY(x, d);
        const func = this.calculaNovaFuncao(novoY);
        const lambda = this.newton(0.001, func, 'd');
        const xk_1 = this.calculaY(x, d, lambda);
        if (lambda === 0) {
          return { i: iteracoes, res: `X* = ${xk_1}` };
        }
        gradiente = this.calculaGradiente(xk_1);
        normal = this.calculaNormal(gradiente);
        d = this.calculaD(x, xk_1, d);
        iteracoes.push({ xk: xk_1, lambda, d, normal });
        // console.log(iteracoes);
        console.log(i);
        x = xk_1;
      }
      seila++;
      normal = this.calculaNormal(gradiente);
    }
    return { i: iteracoes, x };
  }
  multiply = (mA: number[][], mB: number[][]): number[][] => {
    const m = mA[0].length; // coluna da primeira
    const n = mB.length; // linha da segunda if (m === n) {
    const result = [...Array(mA.length)]
      .fill(0)
      .map((_row) => [...Array(mB[0].length)].fill(0));
    return result.map((row, i) =>
      row.map((_val, j) =>
        mA[i].reduce((sum, elm, k) => sum + elm * mB[k][j], 0)
      )
    );
  }
  transposta = (array: number[][]) => {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  divideByScalar = (matrix: number[][], number: number) => {
    // da pra fazer um negocio de function programmar para reaproveitar as coisas desse codigo
    return this.multiplyByScalar(matrix, 1 / number);
  }
  transformMatrxToScalar = (matrix: number[][]) => {
    return matrix[0][0];
  }
  SomaMatrizes = (matrixA: number[][], matrixB: number[][]): number[][] => {
    const coluna = matrixA.length;
    const linha = matrixA[0].length;
    const colunaB = matrixB.length;
    const linhaB = matrixB[0].length;

    if (coluna !== colunaB || linha !== linhaB) {
      return [[], []];
    }
    const resultado = [...Array(coluna)]
      .fill(0)
      .map((_, x) => [...Array(linha)].fill(0));
    for (let i = 0; i < coluna; i++) {
      for (let j = 0; j < linha; j++) {
        resultado[i][j] = matrixA[i][j] + matrixB[i][j];
      }
    }
    return resultado;
  }

  SubTraiMatrizes = (matrixA: number[][], matrixB: number[][]) => {
    const coluna = matrixA.length;
    const linha = matrixA[0].length;
    const colunaB = matrixB.length;
    const linhaB = matrixB[0].length;

    if (coluna !== colunaB || linha !== linhaB) {
      return 0;
    }
    const resultado = [...Array(coluna)]
      .fill(0)
      .map((_, x) => [...Array(linha)].fill(0));
    for (let i = 0; i < coluna; i++) {
      for (let j = 0; j < linha; j++) {
        console.log(i, j);
        resultado[i][j] = matrixA[i][j] - matrixB[i][j];
      }
    }
    return resultado;
  }

  multiplyByScalar = (matrix: number[][], number: number) => {
    const coluna = matrix[0].length;
    const linha = matrix.length;
    // console.log(linha, coluna);
    // console.log("------------------------------");
    const resultado = [...Array(linha)]
      .fill(0)
      .map((_, x) => [...Array(coluna)].fill(0));
    // console.log(resultado);
    for (let i = 0; i < linha; i++) {
      for (let j = 0; j < coluna; j++) {
        resultado[i][j] = matrix[i][j] * number;
      }
    }
    // console.log(resultado);
    // console.log("------------------------------");
    return resultado;
  }
}
