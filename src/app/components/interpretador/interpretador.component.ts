import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-interpretador',
  templateUrl: './interpretador.component.html',
  styleUrls: ['./interpretador.component.scss']
})
export class InterpretadorComponent implements OnInit {
  // Opcoes para mostrar ou nao as caixas de entrada do delta ou epsilon
  @Input() options = { delta: true, epsilon: true, x0: true, intervalo: true };
  // Evento que emite os dados de entrada, quando o usuario aperta Buscar
  @Output() functionData = new EventEmitter<DadosEntrada>();
  // Evento que emite ao usuario apertar Limpar
  @Output() clearData = new EventEmitter();

  // Form de input, para validar as entradas
  inputForm: FormGroup;

  // Erro para ser mostrado no input de função, caso houver
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
      funcao: [, Validators.required],
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
      this.inputForm.addControl('epsilon', this.fb.control({ value: null, disabled: false }, Validators.required));
    }

    // Se o epsilon estiver ativado na configuracao, cria mais um campo do forms
    if (this.options.x0) {
      this.inputForm.addControl('x0', this.fb.control({ value: null, disabled: false }, Validators.required));
    }
  }

  limpar() {
    // Limpa os dados dos forms e emite o evento de clear para o componente pai
    this.inputForm.reset();
    this.clearData.emit();
  }

  sendInfo() {
    // Emite um evento de limpar dados (usados no componente pai para limpar a tabela e etc)
    this.clearData.emit();
    this.functionError = null;
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
    if (funcaoOBJ.type !== 'FunctionAssignmentNode') {
      // Declaração da função no forms está errado!, mostra o div com texto de erro!
      this.functionError = 'O formato da função está errada! Ex: f(x) = 2x^2 + 7x + 2';
      return;
    } else if (funcaoOBJ.params.length > 1) {
      // Declaração da função no forms está errado!, mostra o div com texto de erro!
      this.functionError = 'Somente funções mono variáveis por favor!';
      return;
    } else if (!funcaoOBJ.params.length) {
      // Declaração da função no forms está errado!, mostra o div com texto de erro!
      this.functionError = 'Falta a variavel na declaração da funçao!';
      return;
    }
    // Derivada primeira e segunda da funcao
    const derivada1 = math.derivative(funcaoOBJ, ...funcaoOBJ.params);
    const derivada2 = math.derivative(derivada1, ...funcaoOBJ.params).compile();
    const d1 = derivada1.compile();
    // Emite os dados das funções para seu metodo usar
    this.functionData.emit({
      funcao: {
        // Contem qual letra foi usada pra fazer a função; Ex; f(x) - variavel x; f(y) - variavel y
        params: funcaoOBJ.params,
        // Compila a função inserida pelo usuário
        ...funcaoOBJ.expr.compile(),
        // Primeira Derivada
        d1: d1.eval,
        d2: derivada2.eval,
      },
      a: form.a,
      b: form.b,
      delta: form.delta,
      epsilon: form.epsilon,
      x0: form.x0,
    });
  }

}

interface DadosFuncao {
  // Contém os caracteres das variaveis inseridas pelo usuario, ex: f(x) - x, f(u) - u;
  params: string[];
  // Contém a função que o usuario inseriu pronta para uso
  eval: Function;
  // Contem a derivada primeira da funcao, pronta para uso
  d1: Function;
  // Derivada segunda da função inserida pelo usuario
  d2: Function;
}

// Dados inseridos pelo usuario
export interface DadosEntrada {
  funcao: DadosFuncao;
  a: number;
  b: number;
  delta: number;
  epsilon: number;
  x0: number;
}
