import { ApresentacaoComponent } from './../../pages/apresentacao/apresentacao.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BuscauniformeComponent } from 'src/app/pages/buscauniforme/buscauniforme.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'apresentacao',   component: ApresentacaoComponent },
    { path: 'buscauniforme',  component: BuscauniformeComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
