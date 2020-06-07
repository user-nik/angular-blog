import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './services/auth.guard';
import { SearchPipe } from './search.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';

registerLocaleData(ruLocale, 'ru')

@NgModule({
    declarations: [
        AdminLayoutComponent, 
        DashboardPageComponent, 
        CreatePageComponent, 
        EditPageComponent,
        LoginPageComponent,
        SearchPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children:[
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate:[AuthGuard]},
                    {path: 'create', component: CreatePageComponent, canActivate:[AuthGuard]},
                    {path: 'post/:id/edit', component: EditPageComponent, canActivate:[AuthGuard]},
                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [AuthGuard, AlertService]
})

export class AdminModule{

}