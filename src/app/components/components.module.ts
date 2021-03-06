import { TabelaIteracoesComponent } from './tabela-iteracoes/tabela-iteracoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterpretadorComponent } from './interpretador/interpretador.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    SidebarComponent,
    InterpretadorComponent,
    TabelaIteracoesComponent,
  ],
  exports: [
    SidebarComponent,
    InterpretadorComponent,
    TabelaIteracoesComponent,
  ]
})
export class ComponentsModule { }
