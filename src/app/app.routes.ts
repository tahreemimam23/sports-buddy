import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthGuard } from './guard/auth.guard';
import { AddEditCategoryComponent } from './admin/add-edit-category/add-edit-category.component';
import { AddEditCityComponent } from './admin/add-edit-city/add-edit-city.component';
import { AddEditAreaComponent } from './admin/add-edit-area/add-edit-area.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
            { path: 'category', component: AddEditCategoryComponent },
            { path: 'city', component: AddEditCityComponent },
            { path: 'area', component: AddEditAreaComponent }
        ]
    },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterUserComponent }
];
