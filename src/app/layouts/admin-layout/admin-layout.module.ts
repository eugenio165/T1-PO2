import { CilindricasComponent } from './../../pages/cilindricas/cilindricas.component';
import { FibonacciComponent } from './../../pages/fibonacci/fibonacci.component';
import { AureaComponent } from './../../pages/aurea/aurea.component';
import { DicotomicaComponent } from './../../pages/dicotomica/dicotomica.component';
import { BissecaoComponent } from './../../pages/bissecao/bissecao.component';
import { NewtonComponent } from './../../pages/newton/newton.component';
import { ComponentsModule } from './../../components/components.module';
import { BuscauniformeComponent } from './../../pages/buscauniforme/buscauniforme.component';
import { ApresentacaoComponent } from './../../pages/apresentacao/apresentacao.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ApresentacaoComponent,
    BuscauniformeComponent,
    NewtonComponent,
    BissecaoComponent,
    DicotomicaComponent,
    FibonacciComponent,
    AureaComponent,
    CilindricasComponent,
  ],
})

export class AdminLayoutModule {}
