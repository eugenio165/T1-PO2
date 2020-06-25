// tslint:disable-next-line: max-line-length
import { GradienteConjugadoGeneralizadoComponent } from './../../pages/gradiente-conjugado-generalizado/gradiente-conjugado-generalizado.component';
import { CiclicasComponent } from './../../pages/ciclicas/ciclicas.component';
import { GradienteComponent } from './../../pages/gradiente/gradiente.component';
import { HookeAndJeevesComponent } from './../../pages/hooke&jeeves/hooke-and-jeeves.component';
import { FibonacciComponent } from './../../pages/fibonacci/fibonacci.component';
import { DicotomicaComponent } from './../../pages/dicotomica/dicotomica.component';
import { BissecaoComponent } from './../../pages/bissecao/bissecao.component';
import { ApresentacaoComponent } from './../../pages/apresentacao/apresentacao.component';
import { Routes } from '@angular/router';
import { BuscauniformeComponent } from 'src/app/pages/buscauniforme/buscauniforme.component';
import { NewtonComponent } from 'src/app/pages/newton/newton.component';
import { AureaComponent } from 'src/app/pages/aurea/aurea.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'apresentacao',   component: ApresentacaoComponent },
    { path: 'buscauniforme',  component: BuscauniformeComponent },
    { path: 'newton',         component: NewtonComponent },
    { path: 'dicotomica',     component: DicotomicaComponent },
    { path: 'aurea',          component: AureaComponent },
    { path: 'fibonacci',      component: FibonacciComponent },
    { path: 'bissecao',       component: BissecaoComponent },
    { path: 'coordenadas-ciclicas', component: CiclicasComponent },
    { path: 'hooke&jeeves', component: HookeAndJeevesComponent},
    { path: 'gradiente', component: GradienteComponent },
    // { path: 'newton-irrestrito', component: },
    { path: 'gradiente-conjugado', component: GradienteConjugadoGeneralizadoComponent },
    // { path: 'fletcher&reeves', component: },
    // { path: 'fletcher-powell', component: },
];
