import { Options } from './../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-newtonirrestrito',
  templateUrl: './../../components/metodo/metodo.component.html',
  styleUrls: ['./../../components/metodo/metodo.component.scss']
})
export class NewtonIrrestritoComponent extends MetodoComponent {


  titulo = 'Método de Newton Irrestrito';
  class = 'bg-gradient-default';
  opcoes: Options = { epsilon: true, intervalo: true, multi: true, hessiana: true, x0: true };
  colunas = ['x', 'd1x', 'd2x', 'Xk_1'];
  xk = 0;

  constructor() {
    super();
  }

  passo(a: number, b: number, iteracoes: object[], delta?: number, epsilon?: number, x0?: string): SaidaMetodo {
    const pontoInicial = x0.split(',');
    const numeros = pontoInicial.map(string => Number(string.trim()));
    if (numeros.length !== this.funcao.params.length) {
        return { erro: 'O número de entradas no X0 nao bate com o numéro de variavéis na função!' };
    }

    var k = 0;
    var xk = numeros;
    var xk_1;
    let e = epsilon;
    let auxinversa;
    var gradienteXk = this.calculaGradiente(xk);
    var hessianaXk;
    var dethessianaXk;
    var inversahessianaXk;
    var w;
    var normagradiente;
    var distanciaponto;
    var condição = true;

    while(condição){
      hessianaXk = this.calculaHessiana(xk);

      dethessianaXk = ((hessianaXk[0][0])*(hessianaXk[1][1])) - ((hessianaXk[0][1])*(hessianaXk[1][0]));

      inversahessianaXk = math.multiply(hessianaXk,1/dethessianaXk);
      auxinversa = inversahessianaXk[0][0];
      inversahessianaXk[0][0] = inversahessianaXk[1][1];
      inversahessianaXk[1][1] = auxinversa;
      inversahessianaXk[0][1] = -inversahessianaXk[0][1];
      inversahessianaXk[1][0] = -inversahessianaXk[1][0];

      w = math.multiply(math.multiply(gradienteXk,(-1)),inversahessianaXk);


      xk_1 = math.chain(xk).add(w);
      console.log(w);
      console.log(xk);
      console.log(xk_1);


      gradienteXk = this.calculaGradiente(xk_1);
      normagradiente = math.sqrt((gradienteXk[0]*gradienteXk[0]) + (gradienteXk[1]*gradienteXk[1]));
      distanciaponto = math.sqrt((xk[0]*xk_1[0]) + (xk[1]*xk_1[1]));
      
      if((e > normagradiente) || (e > distanciaponto)){
        condição = false;
      }
      else{
        xk = xk_1;
      }

    }
    console.log(xk);

    const res = this.formataResultado(xk);
    return { i: iteracoes, res: `X* = ${res}` };
    
    
  }

}
