import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as math from 'mathjs';

/**
 * Opções do componente para o interpretador
 */
export interface Options {
  /**
   * Se deve mostrar o input para o delta
   */
  delta?: boolean;
  /**
   * Se deve mostrar o input para o epsilon
   */
  epsilon?: boolean;
  /**
   * Se deve mostrar o input para o intervalo
   */
  intervalo?: boolean;
  /**
   * Se deve mostrar o input para o X0
   */
  x0?: boolean;
  /**
   * Se é multi-variável ou não
   */
  multi?: boolean;
  /**
   * Se true, devolve o campo hessiana da funçao populado com a hessiana, como acontece
   * com d1 e d2 (derivada em relação a x1 e derivada em relação a x2)
   */
  hessiana?: boolean;
}

@Component({
  selector: 'app-interpretador',
  templateUrl: './interpretador.component.html',
  styleUrls: ['./interpretador.component.scss']
})
export class InterpretadorComponent implements OnInit {
  /**
   * Opcoes para mostrar ou nao as caixas de entrada do delta ou epsilon
   */
  @Input() options: Options = { delta: true, epsilon: true, x0: true, intervalo: true, multi: false };

  /**
   * Evento que emite os dados de entrada, quando o usuario aperta Buscar
   */
  @Output() functionData = new EventEmitter<DadosEntrada>();

  /**
   * Evento que emite ao usuario apertar Limpar
   */
  @Output() clearData = new EventEmitter();

  /**
   * Form de input, para validar as entradas
   */
  inputForm: FormGroup;

  /**
   * Mensagems para mostar em baixo do interpretador
   */
  messages: string[] = null;
  errorMessage: string = null;

  /**
   * Erro para ser mostrado no input de função, caso houver
   */
  functionError = null;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // Valida os intervalos a <= x <= b
    const intervaloValidator: ValidatorFn = (form: AbstractControl) => {
      const error = {
        intervaloValidator: 'A >= B!',
      };
      const a = form.get('a');
      const b = form.get('b');
      return ( +a.value >= +b.value && a.touched && b.touched) ? error : null;
    };
    // Form de entrada do usuario
    this.inputForm = this.fb.group({
      funcao: ['f(x1, x2) = 4x1^2 + 2x1*x2 + 2x2^2 + x1 + x2', Validators.required],
    });

    // Se o A estiver ativado na configuracao, cria mais um campo do forms
    if (this.options.intervalo) {
      this.inputForm.addControl('a', this.fb.control({ value: null, disabled: false }, Validators.required));
      this.inputForm.addControl('b', this.fb.control({ value: null, disabled: false }, Validators.required));
      this.inputForm.setValidators(intervaloValidator);
    }

    // Se o delta estiver ativado na configuracao, cria mais um campo do forms
    if (this.options.delta) {
      this.inputForm.addControl('delta', this.fb.control({ value: null, disabled: false }, Validators.required));
    }

    // Se o epsilon estiver ativado na configuracao, cria mais um campo do forms
    if (this.options.epsilon) {
      this.inputForm.addControl('epsilon', this.fb.control({ value: 0.1, disabled: false }, Validators.required));
    }

    // Se o epsilon estiver ativado na configuracao, cria mais um campo do forms
    if (this.options.x0) {
      this.inputForm.addControl('x0', this.fb.control({ value: '0, 3', disabled: false }, Validators.required));
    }
  }

  limpar() {
    // Limpa os dados dos forms e emite o evento de clear para o componente pai
    this.inputForm.reset();
    this.clearData.emit();
    this.functionError = null;
    this.messages = null;
    this.errorMessage = null;
  }

  montaStringSimbolosInterpretados(functionNode): string {
    const symbols = functionNode.filter((node) => {
      return node.isSymbolNode;
    });
    const distinctSymbols = new Set<string>(symbols.map((node) => node.name));
    let msgstring = '';
    distinctSymbols.forEach((symbolName) => {
       msgstring = msgstring.concat(`${symbolName}, `);
    });
    return msgstring;
  }

  sendInfo() {
    // Emite um evento de limpar dados (usados no componente pai para limpar a tabela e etc)
    this.clearData.emit();
    this.functionError = null;
    this.messages = null;
    this.errorMessage = null;

    const form = this.inputForm.value;
    let funcaoOBJ;
    try {
      // Lê a função inserida pelo usuário
      funcaoOBJ = math.parse(form.funcao);
    } catch (e) {
      // Declaração da função no forms está errado!, mostra o div com texto de erro!
      this.functionError = 'Há algum símbolo não suportado na função!!';
      return;
    }
    const simbolos = this.montaStringSimbolosInterpretados(funcaoOBJ);
    const functionString = funcaoOBJ.toString();
    const paramLength = funcaoOBJ.params.length;
    const functionSymbolsLength = new Set(funcaoOBJ.filter((n) => n.isSymbolNode).map((n) => n.name)).size;
    if (paramLength !== functionSymbolsLength) {
      // tslint:disable-next-line: max-line-length
      this.errorMessage = `A função foi passada com ${paramLength} paramêtros, mas foi encontrado ${functionSymbolsLength} variáveis, verifique a função!!!`;
    }
    this.messages = [
      `Função Interpretada: ${functionString}`,
      `Variáveis interpretadas: ${simbolos}`,
    ];

    if (funcaoOBJ.type !== 'FunctionAssignmentNode') {
      // Declaração da função no forms está errado!, mostra o div com texto de erro!
      this.functionError = 'O formato da função está errada! Ex: f(x) = 2x^2 + 7x + 2';
      return;
    } else if (funcaoOBJ.params.length > 1 && !this.options.multi) {
      // Declaração da função no forms está errado!, mostra o div com texto de erro!
      this.functionError = 'Falta a variavel na declaração da funçao!';
      return;
    }
    // Derivada primeira e segunda da funcao para cada variável
    // (é um objeto com as chaves sendo as variaveis e o valor a função de eval para aquela derivada)
    let derivada1, derivada2;
    const hessiana: Function[][] = [];
    if (this.options.multi) {
      const derivadas1 = {};
      const derivadas2 = {};
      for (let i = 0; i < funcaoOBJ.params.length; i++) {
        const d1 = math.derivative(funcaoOBJ, funcaoOBJ.params[i]);
        const d1Compiled = d1.compile();
        derivadas1[funcaoOBJ.params[i]] = d1Compiled.eval;
        const d2Compiled = math.derivative(d1, funcaoOBJ.params[i]).compile();
        derivadas2[funcaoOBJ.params[i]] = d2Compiled.eval;

        // Calcula a hessiana
        if (this.options.hessiana) {
          const hessianaLinhaXi = [];
          for (let j = 0; j < funcaoOBJ.params.length; j++) {
            const derivadaXiXj = math.derivative(d1, funcaoOBJ.params[j]);
            hessianaLinhaXi.push(derivadaXiXj.compile().eval);
          }
          hessiana.push(hessianaLinhaXi);
        }
      }
      derivada1 = derivadas1;
      derivada2 = derivadas2;
    } else {
      // Mono variaveis
      let d1 = math.derivative(funcaoOBJ, ...funcaoOBJ.params);
      const d2 = math.derivative(d1, ...funcaoOBJ.params).compile();
      d1 = d1.compile();
      derivada1 = d1.eval;
      derivada2 = d2.eval;
    }

    setTimeout(() => {
      // Emite os dados das funções para seu metodo usar
      this.functionData.emit({
        funcao: {
          // Contem qual letra foi usada pra fazer a função; Ex; f(x) - variavel x; f(y) - variavel y
          params: funcaoOBJ.params,
          // Compila a função inserida pelo usuário
          obj: funcaoOBJ,
          ...funcaoOBJ.expr.compile(),
          // Primeira Derivada
          d1: derivada1,
          d2: derivada2,
          hessiana,
        },
        a: form.a,
        b: form.b,
        delta: form.delta,
        epsilon: form.epsilon,
        x0: form.x0,
      });

    }, 100);
  }

}

export interface DadosFuncao {
  obj: any;

  /**
   * Contém os caracteres das variaveis inseridas pelo usuario, ex: f(x) - x, f(u) - u;
   */
  params: string[];

  /**
   * Contém a função que o usuario inseriu pronta para uso
   */
  eval: Function;

  /**
   * Contem a derivada primeira da funcao, pronta para uso
   */
  d1: any;

  /**
   * Derivada segunda da função inserida pelo usuario
   */
  d2: any;

  hessiana?: Function[][];
}

export interface DadosEntrada {
  funcao: DadosFuncao;
  a: number;
  b: number;
  delta: number;
  epsilon: number;
  x0: number;
}
