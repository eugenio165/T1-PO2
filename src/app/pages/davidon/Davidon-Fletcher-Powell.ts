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
  selector: 'app-davidon-fletcher-powell',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class DavidonFletcherPowellComponent extends MetodoComponent {
  titulo = 'Davidon Fletcher Powell';
  class = 'bg-gradient-default';
  opcoes: Options = { epsilon: true, x0: true, multi: true };
  precisao = 6;
  colunas = {
    k: 'k',
    i: 'i',
    xk: 'Xk',
    lambda: 'lambda',
    normal: '||▽f(Xk)||',
  };
  // this: any;
  limitaPrecisao(num: number): number {
    return Number(num.toFixed(6));
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

    const resposta = this.david(
      numeros,
      epsilon,
      this.funcao.params.length,
      iteracoes
    );
    return resposta;
  }
  calculaD(s, gradiente) {
    const menosS = this.multiplyByScalar(s, -1);
    const direcaoRaw = this.multiply(menosS, [[gradiente[0]], [gradiente[1]]]);
    return [direcaoRaw[0][0], direcaoRaw[1][0]];
  }
  // f(x1,x2)= 4*x1^2+x1*x2+(1/2)*x2^2-18*x1-4*x2
  david = (xini, epsilon, n, iteracoes) => {
    let s: any = [
      [1, 0],
      [0, 1],
    ];
    let x = xini;
    let gradiente = this.calculaGradiente(xini);
    let k = 0;
    let i = 0;
    let seila = 0;
    let moduleGk = this.calculaNormal(gradiente);
    while (moduleGk >= epsilon && seila < 13) {
      const direcao = this.calculaD(s, gradiente);
      // achar o lambda
      const novoY = this.calculaY(x, direcao);
      const func = this.calculaNovaFuncao(novoY);
      const lambda = this.newton(0.001, func, 'd');
      // ----------------------------
      const xk_1 = this.calculaY(x, direcao, lambda);
      x = xk_1;

      if (lambda === 0) {
        return { i: iteracoes, res: `X* = ${xk_1}`, mensagem: 'lambda == 0' };
      }
      if (k < n - 1) {
        const provisorioRaw = gradiente;
        gradiente = this.calculaGradiente(xk_1);
        s = this.calculaS(xk_1, lambda, gradiente, provisorioRaw, s);
        moduleGk = this.calculaNormal(gradiente);
        iteracoes.push({ k, i, xk: xk_1, lambda, normal: moduleGk });
        k++;
        seila++;
      } else {
        i++;
        gradiente = this.calculaGradiente(xk_1);
        moduleGk = this.calculaNormal(gradiente);
        iteracoes.push({ k, i, xk: xk_1, lambda, normal: moduleGk });
        k = 0;
        seila++;
      }
      // console.log(d);
    }
    return { i: iteracoes, res: `X* = ${x}` };
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
    const linha = matrixA[1].length;
    const colunaB = matrixB.length;
    const linhaB = matrixB[0].length;

    if (coluna !== colunaB || linha !== linhaB) {
      return [[], []];
    }
    const resultado = [...Array(coluna)]
      .fill(0)
      .map((_, x) => [...Array(linha)].fill(0));
    for (let i = 0; i < linha; i++) {
      for (let j = 0; j < coluna; j++) {
        resultado[i][j] = matrixA[i][j] + matrixB[i][j];
      }
    }
    return resultado;
  }

  SubTraiMatrizes = (matrixA: number[][], matrixB: number[][]) => {
    const coluna = matrixA.length;
    const linha = matrixA[1].length;
    const colunaB = matrixB.length;
    const linhaB = matrixB[0].length;

    if (coluna !== colunaB || linha !== linhaB) {
      return 0;
    }
    const resultado = [...Array(coluna)]
      .fill(0)
      .map((_, x) => [...Array(linha)].fill(0));
    for (let i = 0; i < linha; i++) {
      for (let j = 0; j < coluna; j++) {
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

  calculaS(xRaw, lambda, gradienteRaw, provisorioRaw, s) {
    const x = [[xRaw[0]], [xRaw[1]]];
    const gDFx = [[gradienteRaw[0]], [gradienteRaw[1]]];
    const provisorio = [[provisorioRaw[0]], [provisorioRaw[1]]];

    const pk = [[x[0][0]], [x[1][0]]];
    const tpk = this.transposta(pk);
    const qk = [
      [gDFx[0][0] - provisorio[0][0]],
      [gDFx[1][0] - provisorio[1][0]],
    ];
    const tqk = this.transposta(qk);
    const cima1 = this.multiply(pk, tpk);
    const baixo1 = this.multiply(tpk, qk);
    const baixo1Scalar = this.transformMatrxToScalar(baixo1);
    const cima2 = this.multiply(this.multiply(this.multiply(s, qk), tqk), s);
    const baixo2 = this.multiply(this.multiply(tqk, s), qk);
    const baixo2Scalar = this.transformMatrxToScalar(baixo2);
    const esquerda = this.divideByScalar(cima1, baixo1Scalar);
    const direita = this.divideByScalar(cima2, baixo2Scalar);
    const SkPlusEsquerda = this.SomaMatrizes(s, esquerda);
    const sk = this.SubTraiMatrizes(SkPlusEsquerda, direita);

    return sk;
  }
}
