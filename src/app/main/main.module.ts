import { MainComponent } from './main.component';

import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// Services
import { CommonHttpService } from './shared/commonHttp.service';
import { CartValueService } from './shared/cart-value.service';
import { CategoriesService } from './categories/categories.service';
import { MainService } from './main.service';
import { LoginService } from '../login/login.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';

@NgModule({
    declarations: [
        MainComponent,
        CartComponent
    ],
    imports: [
        
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: 'admin',
                        loadChildren: 'app/main/admin/admin.module#AdminModule',
                        canLoad: [AuthGuard]
                    },
                    {
                        path: '',
                        redirectTo: 'admin',
                        pathMatch: 'full'
                    },
                    {
                        path: 'manager',
                        loadChildren: 'app/main/manager/manager.module#ManagerModule',

                    },
                    {
                        path: 'category',
                        loadChildren: 'app/main/categories/categories.module#CategoriesModule'
                    },
                    {
                        path: 'sa',
                        loadChildren: 'app/main/super-admin/super-admin.module#SuperAdminModule'
                    },
                    {
                        path: 'cart',
                        component: CartComponent
                    }
                ]
            }
        ])
    ],
    providers: [CartValueService, CommonHttpService, CategoriesService, MainService, LoginService, AuthGuard, CartService]
})

export class MainModule {
    constructor() {

    }
}