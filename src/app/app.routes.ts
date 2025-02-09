import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guard/auth.guard';
import {RequestFormComponent} from "./pages/request-form/request-form.component";
import {RequestListComponent} from "./pages/request-list/request-list.component";
import {RequestUpdateComponent} from "./pages/request-update/request-update.component";
import {CollectorRequestListComponent} from "./pages/collector-request-list/collector-request-list.component";
import {HomeComponent} from "./pages/home/home.component";
import {RewardsResolver} from "./resolvers/rewards.resolver";
import {RewardsComponent} from "./pages/rewards/rewards.component";

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'request-form' , component: RequestFormComponent},
  { path: 'request-list', component: RequestListComponent},
  { path: 'request-update/:id', component: RequestUpdateComponent , canActivate: [authGuard]},
  { path: 'collector-requests', component: CollectorRequestListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'rewards', component: RewardsComponent, canActivate: [authGuard], resolve: { data: RewardsResolver } },
  { path: '**', redirectTo: 'login' }
];
