import { Options } from './../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
    selector: 'app-gradiente',
    templateUrl: './../../components/metodo/metodo.component.html',
    styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class GradienteComponent extends MetodoComponent {
    titulo = 'Gradiente';
    class = 'bg-gradient-warning';
    opcoes: Options = { epsilon: true, x0: true, multi: true };
    colunas = {
        xk: 'Xk',
        gradienteXk: '▽f(Xk)',
        normal: '||▽f(Xk)||',
        dk: '-▽f(Xk)',
        lk: 'λk',
        xk_1: 'Xk+1',
    };
    activated = false;

    constructor() {
        super();
    }

    pegaDirecaoClindricas(index) {
        const array = [];
        for (let i = 0; i < this.funcao.params.length; i++) {
            if (i === index - 1) {
                array.push(1);
            } else {
                array.push(0);
            }
        }
        return array;
    }

    pegaGradiente(array: Array<number>) {
        const obj1 = {};
        obj1[this.funcao.params[0]] = array[0];
        obj1[this.funcao.params[1]] = array[1];
        const gradiente1 = this.funcao.d1.x1({...obj1});
        const gradiente2 = this.funcao.d1.x2({...obj1});
        return [gradiente1, gradiente2];
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
        let normal = 99999999;
        while (normal >= epsilon) {
            const gradienteXk = this.pegaGradiente(xk);
            normal = this.calculaNormal(gradienteXk);
            const direcao = this.pegaGradiente(xk).map(num => -num);
            let lambida;
            try {
                const novoY = this.calculaY(xk, direcao);
                const func = this.calculaNovaFuncao(novoY);
                lambida = this.newton(epsilon, func, 'd');
                xk_1 = this.calculaY(xk, direcao, lambida);
            } catch (e) {
                return { erro: e };
            }
            iteracoes.push({ xk, gradienteXk, normal, dk: direcao, lk: lambida, xk_1: xk_1 });
            k++;
            xk = xk_1;
        }
        return { i: iteracoes, res: `X* = ` + xk.map(num => this.limitaPrecisao(num)) };
    }

}
