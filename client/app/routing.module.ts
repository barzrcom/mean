import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {AccountComponent} from './pages/account/account.component';
import {UsersComponent} from './pages/users/users.component';
import {ConnectedComponent} from './pages/connected/connected.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {StatisticsComponent} from './pages/statistics/statistics.component';
import {SuppliersComponent} from './pages/suppliers/suppliers.component';
import {CreateSupplierComponent} from './pages/createSupplier/createSupplier.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'suppliers', component: SuppliersComponent},
    {path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin]},
    {path: 'users', component: UsersComponent, canActivate: [AuthGuardAdmin]},
    {path: 'createSupplier', component: CreateSupplierComponent, canActivate: [AuthGuardLogin]},
    {path: 'connected', component: ConnectedComponent, canActivate: [AuthGuardAdmin]},
    {path: 'notfound', component: NotFoundComponent},
    {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuardLogin]},
    {path: '**', redirectTo: '/notfound'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutingModule {
}
