import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuards } from './auth-guards.services';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamicComponent } from './dynamic/dynamic.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'landing', component: LandingpageComponent, children: [
            { path: 'dynamic', component: DynamicComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile', component: UserProfileComponent },
            { path: 'config', component: ConfigurationComponent }
        ]
    },
    // { path: 'landing', canActivate: [AuthGuards], component: LandingpageComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        useHash: true,
        // enableTracing: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
