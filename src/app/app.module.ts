import { importProvidersFrom, NgModule } from "@angular/core";
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
import { FirebaseAuthService } from "./service/firebase-auth.service";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { firebaseConfig } from "./configuration/firebase.config";
import { FirebaseUserService } from "./service/firebase-user.service";
import { FirebaseAdminService } from "./service/firesbase-admin.service";


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
        importProvidersFrom([
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireAuthModule,
            AngularFireDatabaseModule,
            AngularFirestoreModule
        ]),
        AuthService, 
        CityService,
        CategoryService,
        AreaService,
        UserService,
        FirebaseAuthService,
        FirebaseUserService,
        FirebaseAdminService
    ],
    exports: [RouterModule]

})
export class AppModule {

}