import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuards } from './auth-guards.services';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'landing', component: LandingpageComponent },
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
