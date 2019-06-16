import { Component } from "@angular/core";
import { Options } from "./../../components/interpretador/interpretador.component";
import {
  MetodoComponent,
  SaidaMetodo
} from "src/app/components/metodo/metodo.component";
import * as math from "mathjs";

export abstract class ModeloT2Component extends MetodoComponent {
  constructor() {
    super();
  }

  ngOnInit() {}

  abstract calculaDirecao(): number;
  abstract criterioDeParada(): boolean;
  abstract calculaXk(): number;

  algoritmoGeral(erro: number, xInicial: number) {
    let k: number = 0;
    let xk: number = xInicial;
    while (this.criterioDeParada()) {
      this.calculaDirecao();
      xk = this.calculaXk();
      k++;
    }
    return xk;
  }
}
