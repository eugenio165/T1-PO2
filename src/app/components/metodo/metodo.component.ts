import { SaidaMetodo } from './metodo.component';
import { DadosEntrada, DadosFuncao } from './../interpretador/interpretador.component';


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
  abstract opcoes: object;
  // Quantidade de numeros apos a virgula para mostrar na tabela
  protected precisao: number;
  // Objeto de saida do metodo para ser enviado para a tabela
  protected resposta: SaidaMetodo;
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
    this.resposta = this.passo(dados.a, dados.b, [], dados.delta, dados.epsilon);

    // Scrolla o HTML, usado para scrollar até o final da tabela
    setTimeout(() => {
      div.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Função usada pra limitar a precisao, e obter resultados consistentes como feito em sala de aula
  limitaPrecisao (num: number): number {
    return Number(num.toFixed(this.precisao));
  }

  // Função que realiza o passo do metodo e retorna o objeto SaidaMetodo, com as iteracoes, erro, e resultado
  // tslint:disable-next-line:max-line-length
  abstract passo (a: number, b: number, iteracoes: Array<object>, delta?: number, epsilon?: number): SaidaMetodo;

}
