import { DicotomicaComponent } from './../../pages/dicotomica/dicotomica.component';
import { BissecaoComponent } from './../../pages/bissecao/bissecao.component';
import { ApresentacaoComponent } from './../../pages/apresentacao/apresentacao.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BuscauniformeComponent } from 'src/app/pages/buscauniforme/buscauniforme.component';
import { NewtonComponent } from 'src/app/pages/newton/newton.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'apresentacao',   component: ApresentacaoComponent },
    { path: 'buscauniforme',  component: BuscauniformeComponent },
    { path: 'newton',         component: NewtonComponent },
    { path: 'dicotomica',     component: DicotomicaComponent },
    { path: 'bissecao',       component: BissecaoComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
