import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicrosoftLoginGuard } from './msal.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [MicrosoftLoginGuard],
    loadChildren: () =>
      import('./pages/home-template/home-template.module').then(
        (m) => m.HomeTemplateModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
