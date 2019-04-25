import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './core/login/login.component';
import { SingUpComponent } from './core/sing-up/sing-up.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HeroDetailComponent } from './services/hero-detail.component';
import { HeroesComponent } from './services/heroes.component';
import { DashboardComponent } from './services/dashboard.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'singup', component: SingUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
