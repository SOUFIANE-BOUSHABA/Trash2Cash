import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './core/guard/auth.guard';
import {RequestFormComponent} from "./components/request-form/request-form.component";
import {RequestListComponent} from "./components/request-list/request-list.component";
import {RequestUpdateComponent} from "./components/request-update/request-update.component";
import {CollectorRequestListComponent} from "./components/collector-request-list/collector-request-list.component";

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'request-form' , component: RequestFormComponent},
  { path: 'request-list', component: RequestListComponent},
  { path: 'request-update/:id', component: RequestUpdateComponent , canActivate: [authGuard]},
  { path: 'collector-requests', component: CollectorRequestListComponent },
  { path: '**', redirectTo: 'login' }
];
