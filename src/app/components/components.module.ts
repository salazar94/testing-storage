import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './dadatable/dadatable.component';
import { DataTablesModule } from 'angular-datatables';
import { IndexTableComponent } from './index-table/index-table.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DatatableComponent,
    IndexTableComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    RouterModule
  ],
  exports: [
    DatatableComponent,
    IndexTableComponent
  ]
})
export class ComponentsModule { }
