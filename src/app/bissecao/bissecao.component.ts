import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bissecao',
  template: `
    <div class="info">
      <h1>{{ nome }}</h1>
      <h3>{{ ocupacao }}</h3>
    </div>
  `,
  styleUrls: ['./bissecao.component.scss']
})
export class BissecaoComponent {
  @Input() nome;
  @Input() ocupacao;

  constructor() { }

}
