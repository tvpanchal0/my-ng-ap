import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';  // Make sure the guard is implemented correctly

const routes: Routes = [
  // Default route, redirects to 'home'
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 'home' route - protected by AuthGuard
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule), 
    canActivate: [AuthGuard] 
  },

  // 'dashboard' route - protected by AuthGuard
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard] 
  },

  // 'auth' route for login and authentication - not protected
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },

  // Wildcard route to redirect to 'home' if no matching route
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuring routes in the app
  exports: [RouterModule], // Exporting the RouterModule so it can be used in the app
})
export class AppRoutingModule {}
