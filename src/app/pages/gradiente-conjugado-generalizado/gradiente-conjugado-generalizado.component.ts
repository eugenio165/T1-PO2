import { Options } from './../../components/interpretador/interpretador.component';
import { MetodoComponent, SaidaMetodo } from 'src/app/components/metodo/metodo.component';
import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
    selector: 'app-gradiente-conjugado-generalizado',
    templateUrl: './../../components/metodo/metodo.component.html',
    styleUrls: ['./../../components/metodo/metodo.component.scss'],
})
export class GradienteConjugadoGeneralizadoComponent extends MetodoComponent {
    titulo = 'Gradiente Conjugado Generalizado';
    class = 'bg-gradient-default';
    opcoes: Options = { epsilon: true, x0: true, multi: true, hessiana: true };
    colunas = {
        xk: 'Xk',
        gradienteXk: '▽f(Xk)',
        dk: 'D Xk',
        xk_1: 'Xk+1',
        normal: '||▽f(Xk)||',
    };

    passo(a: number, b: number, iteracoes: object[], delta?: number, epsilon?: number, x0?: string): SaidaMetodo {
        const pontoInicial = x0.split(',');
        const numerosX0 = pontoInicial.map(string => Number(string.trim()));
        if (numerosX0.length !== this.funcao.params.length) {
            return { erro: 'O número de entradas no X0 nao bate com o numéro de variavéis na função!' };
        }
        const N = this.funcao.params.length;
        let XK = numerosX0;

        let normalGN = 9999999;
        let limit = 0;
        while (normalGN > epsilon) {
            limit++;
            if (limit > 200)
                throw '';

            let gK = this.calculaGradiente(XK);
            let direcaoK = gK.map((v) => -v);

            for (let i = 0; i <= N - 1; i++) {
                const hessianaK = this.calculaHessiana(XK);
                const dividendo = math.multiply(gK, direcaoK);
                const divisor = math.multiply(math.multiply(direcaoK, hessianaK), direcaoK);
                const lambdaK = -(dividendo / divisor);

                const XK_1 = this.calculaY(XK, direcaoK, lambdaK);
                const gK_1 = this.calculaGradiente(XK_1);


                if (i < N - 1) {
                    const dividendoB = math.multiply(math.multiply(gK_1, hessianaK), direcaoK);
                    const betaK = dividendoB / divisor;

                    const direcaoK_1 = this.calculaY(gK_1.map((v) => -v), direcaoK, betaK);
                    iteracoes.push({
                        xk: XK,
                        gradienteXk: gK,
                        dk: direcaoK,
                        xk_1: XK_1,
                    });
                    XK = XK_1;
                    gK = gK_1;
                    direcaoK = direcaoK_1;
                } else {
                    const gN = this.calculaGradiente(XK_1);
                    normalGN = this.calculaNormal(gN);
                    iteracoes.push({
                        xk: XK,
                        gradienteXk: gK,
                        dk: direcaoK,
                        xk_1: XK_1,
                        normal: normalGN,
                    });
                    XK = XK_1;
                }
            }
        }

        const res = this.formataResultado(XK);
        return { i: iteracoes, res: `X* = ${res}` };
    }

}
