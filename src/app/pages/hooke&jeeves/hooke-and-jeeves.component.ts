import { Options } from './../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
    selector: 'app-hooke-jeeves',
    templateUrl: './../../components/metodo/metodo.component.html',
    styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class HookeAndJeevesComponent extends MetodoComponent {
    titulo = 'Hooke & Jeeves';
    class = 'bg-gradient-danger';
    opcoes: Options = { epsilon: true, x0: true, multi: true };
    colunas = {
        j: 'j',
        Yj: 'Yj',
        Dj: 'Dj',
        Lj: 'λj',
        Yj1: 'Yj+1',
        D: 'd',
        l: 'λ',
        y3d: 'Y3 + λd',
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

    passo(a: number, b: number, iteracoes: object[], delta?: number, epsilon?: number, x0?: string): SaidaMetodo {
        const pontoInicial = x0.split(',');
        const numeros = pontoInicial.map(string => Number(string.trim()));
        if (numeros.length !== this.funcao.params.length) {
            return { erro: 'O número de entradas no X0 nao bate com o numéro de variavéis na função!' };
        }

        var k = 0;
        var xk = numeros;
        var xk_1 = numeros.map(e => 10000);
        var sub = this.calculaSubtracao(xk_1, xk);
        var j = 0;
        // COndicao de parada
        var y = [xk];
        let preIteracao = null;
        while (true) {
            k++;
            j = 1;
            let ktemp = k.toString();
            for (j = 1; j <= this.funcao.params.length; j++) {
                const direcao = this.pegaDirecaoClindricas(j);
                let lambida;
                try {
                    y.push(this.calculaY(y[j - 1], direcao));
                    const func = this.calculaNovaFuncao(y[j]);
                    lambida = this.newton(epsilon, func, 'd');
                    y[j] = this.calculaY(y[j - 1], direcao, lambida);
                    const obj = {};
                    y[j].map((param, g) => {
                        obj[this.funcao.params[g]] = param;
                    });
                    xk_1 = y[j];
                } catch (e) {
                    return { erro: e };
                }
                if (j !== 1)
                    ktemp = "-";
                if (j === this.funcao.params.length)
                    preIteracao = {k: ktemp, j: j, Yj: y[j - 1], Dj: direcao, Lj: lambida, Yj1: y[j] };
                else
                    iteracoes.push({ k: ktemp, j: j, Yj: y[j - 1], Dj: direcao, Lj: lambida, Yj1: y[j] });
            }
            sub = this.calculaSubtracao(xk_1, xk);
            xk = y[j - 1];
            if (this.calculaNormal(sub) < epsilon)
                break;
            let lambida;
            try {
                const novaDirecao = this.calculaY(xk_1, sub);
                const func = this.calculaNovaFuncao(novaDirecao);
                lambida = this.newton(epsilon, func, 'd');
                var y3d = this.calculaY(xk_1, sub, lambida);
                y = [y3d];
                const obj = {};
                y[0].map((param, index) => {
                    obj[this.funcao.params[index]] = param;
                });
            } catch (e) {
                return { erro: e };
            }
            iteracoes.push({ ...preIteracao, D: sub, l: lambida, y3d: y3d })
        }
        return { i: iteracoes };
    }

}
