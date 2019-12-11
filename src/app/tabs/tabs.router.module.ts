import {NgModule} from '@angular/core'
import { Routes,RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'logado',
        children: [
          {
            path: '',
            loadChildren: '../logado/logado.module#LogadoPageModule'
          }
        ]
      },
      {
        path: 'receitas',
        children: [
          {
            path: '',
            loadChildren: '../receitas/receitas.module#ReceitasPageModule'
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: '../perfil/perfil.module#PerfilPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/logado',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/logado',
    pathMatch: 'full'
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsPageRoutingModule {}