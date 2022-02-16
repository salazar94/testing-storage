import { Routes } from "@angular/router";
import { ProductTypeService } from "src/app/services/product-type.service";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { IndexComponent } from "./index/index.component";
import { ShowComponent } from "./show/show.component";

export const PRODUCT_TYPES_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: IndexComponent,
                data: {
                    title: 'Productos'
                }
            },
            {
                path: 'create',
                component: CreateComponent,
                data: {
                    title: 'Productos'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                resolve: { productType: ProductTypeService },
                data: {
                    title: 'Productos'
                }
            },
            {
                path: 'show/:id',
                component: ShowComponent,
                resolve: { productType: ProductTypeService },
                data: {
                    title: 'Productos'
                }
            },
        ]
    }
];
