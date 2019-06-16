import { SaidaMetodo } from './metodo.component';
import { DadosEntrada, DadosFuncao, Options } from './../interpretador/interpretador.component';


// Objeto que a função passo retornará
export interface SaidaMetodo {
  // Array das iterações para mostra na tabela
  i: Array<object>;
  // String de resposta para ser mostrada no final da tabela caso sucesso
  res: string;
  // String de erro para ser apresentado caso der erro
  erro: string;
}

export abstract class MetodoComponent {

  // Titulo do componente
  abstract titulo: string;

  // Classe do css
  abstract class: string;

  // Colunas para a tabela de iterações
  abstract colunas: Array<string>;

  // Objeto para setar as configuracoes do interpretador
  abstract opcoes: Options;

  // Quantidade de numeros apos a virgula para mostrar na tabela
  precisao: number;

  // Objeto de saida do metodo para ser enviado para a tabela
  resposta: SaidaMetodo;

  // Recebe a string com a variavel iniserida pelo usuario
  protected arg: string;

  // Dados da funcao inserida pelo usuario;
  protected funcao: DadosFuncao;


  constructor() { }

  calcularMetodo(dados: DadosEntrada, div) {
    // Pega a precisao dos floats para ser usado, de acordo com o delta, com precisao minima de 4 casas
    try {
      this.precisao = dados.delta.toString().split('.')[1].length;
      this.precisao = (this.precisao >= 4) ? this.precisao : 4;
    } catch (e) {
      this.precisao = 4;
    }
    // Pega a variavel inserida na funcao. Ex: f(x) - pega x; f(y) - pega y; f(z) - pega z
    [this.arg] = dados.funcao.params;
    // Armazena os dados da funcao na variavel para ser usado no componente filho;
    this.funcao = dados.funcao;
    // Pega o objeto de saida do passo (SaidaMetodo)
    try {
      this.resposta = this.passo(dados.a, dados.b, [], dados.delta, dados.epsilon, dados.x0);
    } catch (e) {
      this.resposta = { i: null, erro: 'Não convergiu!', res: null };
    }

    // Scrolla o HTML, usado para scrollar até o final da tabela
    setTimeout(() => {
      div.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  newton(a, b, epsilon, funcao, arg, xk?) {
    xk = (!!xk) ? a : xk;
    // Objeto para passar pra funcao avaliar o resultado
    const valorFuncao = {};
    valorFuncao[arg] = xk;

    // Derivada primeira de xk
    const d1x = this.limitaPrecisao(funcao.d1(valorFuncao));
    // Derivada segunda de xk
    const d2x = this.limitaPrecisao(funcao.d2(valorFuncao));

    // xk+1 - calcula xk+1 com os valores do xk
    const xk_1 = this.limitaPrecisao(xk - (d1x / d2x));

    // Seta scope com xk_1 para usar na função
    const valorXk_1 = {};
    valorXk_1[arg] = xk_1;

    // Se |f(XK+1)| < Epsilon, para
    if (xk < a || xk > b) {
      return xk;
    } else if (Math.abs(funcao.eval(valorXk_1)) < epsilon) {
      return xk_1;
    } else {
      const divisor = (Math.abs(xk_1) > 1) ? Math.abs(xk_1) : 1;
      if (Math.abs(xk_1 - xk) / divisor < epsilon) {
        return xk_1;
      }
      return this.newton(a, b, epsilon, funcao, arg, xk_1);
    }
  }

  // Função usada pra limitar a precisao, e obter resultados consistentes como feito em sala de aula
  limitaPrecisao(num: number): number {
    return Number(num.toFixed(this.precisao));
  }

  // Função que realiza o passo do metodo e retorna o objeto SaidaMetodo, com as iteracoes, erro, e resultado
  // tslint:disable-next-line:max-line-length
  abstract passo(a: number, b: number, iteracoes: Array<object>, delta?: number, epsilon?: number, x0?: string | number): SaidaMetodo;

}
