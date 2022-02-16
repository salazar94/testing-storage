import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { PRODUCT_TYPES_ROUTES } from './product-types.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreateComponent } from './create/create.component';
import { ProductTypesFormComponent } from './components/product-types-form/product-types-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ProductTypesFormComponent,
    EditComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCT_TYPES_ROUTES),
    ComponentsModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NzFormModule,
    DirectivesModule,
    NzNotificationModule,
    NzCardModule
  ]
})
export class ProductTypesModule { }
