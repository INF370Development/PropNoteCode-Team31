import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login', // Define the path for the LoginPage component
    component: LoginPage, // Specify the LoginPage component
  },
  {
    path: 'login',
    component: LoginPage, // Specify your login component
  },
  {
    path: 'landing',
    component: LandingComponent, // Specify your login component
  },
  { path: '', redirectTo: 'landing', pathMatch: 'full', }, // Redirect to your landing page
  // Add other routes for your app
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
