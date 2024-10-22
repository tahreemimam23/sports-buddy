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

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HeaderModule,
        LoginModule,
        AdminModule,
        UserModule,
        RouterModule.forRoot(routes),
    ],
    providers: [],
    exports: [RouterModule]

})
export class AppModule {

}