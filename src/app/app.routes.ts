import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ApplicationlistComponent } from './components/applicationlist/applicationlist.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './components/guards/auth.guard';

export const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'applications',component:ApplicationlistComponent,canActivate:[authGuard]},
  {path:'register',component:RegisterComponent}
];
