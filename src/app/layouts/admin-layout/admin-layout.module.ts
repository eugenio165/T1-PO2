// tslint:disable-next-line: max-line-length
import { GradienteConjugadoGeneralizadoComponent } from './../../pages/gradiente-conjugado-generalizado/gradiente-conjugado-generalizado.component';
import { DavidonFletcherPowellComponent } from './../../pages/davidon/Davidon-Fletcher-Powell';
import { FletcherReevesComponent } from 'src/app/pages/fletcher-reeves/fletcher-reeves';
import { CiclicasComponent } from './../../pages/ciclicas/ciclicas.component';
import { HookeAndJeevesComponent } from './../../pages/hooke&jeeves/hooke-and-jeeves.component';
import { FibonacciComponent } from './../../pages/fibonacci/fibonacci.component';
import { AureaComponent } from './../../pages/aurea/aurea.component';
import { DicotomicaComponent } from './../../pages/dicotomica/dicotomica.component';
import { BissecaoComponent } from './../../pages/bissecao/bissecao.component';
import { NewtonComponent } from './../../pages/newton/newton.component';
import { ComponentsModule } from './../../components/components.module';
import { BuscauniformeComponent } from './../../pages/buscauniforme/buscauniforme.component';
import { ApresentacaoComponent } from './../../pages/apresentacao/apresentacao.component';
import { GradienteComponent } from './../../pages/gradiente/gradiente.component';
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
    GradienteComponent,
    ApresentacaoComponent,
    BuscauniformeComponent,
    NewtonComponent,
    BissecaoComponent,
    DicotomicaComponent,
    FibonacciComponent,
    AureaComponent,
    CiclicasComponent,
    HookeAndJeevesComponent,
    GradienteConjugadoGeneralizadoComponent,
    DavidonFletcherPowellComponent,
    FletcherReevesComponent,
  ],
})

export class AdminLayoutModule {}
