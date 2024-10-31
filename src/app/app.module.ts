import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { LoginModule } from "./login/login.module";
import { AdminModule } from "./admin/admin.module";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { HeaderModule } from "./header/header.module";
import { UserModule } from "./user/user.module";
import { RegisterUserModule } from "./register-user/register-user.module";
import { AuthService } from "./service/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { CityService } from "./service/city.service";
import { CategoryService } from "./service/category.service";
import { AreaService } from "./service/area.service";
import { UserService } from "./service/user.service";
import { LoadingSpinnerModule } from "./loading-spinner/loading-spinner.module";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HeaderModule,
        RegisterUserModule,
        LoginModule,
        AdminModule,
        UserModule,
        LoadingSpinnerModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        AuthService, 
        CityService,
        CategoryService,
        AreaService,
        UserService
    ],
    exports: [RouterModule]

})
export class AppModule {

}