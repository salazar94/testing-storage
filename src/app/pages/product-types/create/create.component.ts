import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductType } from 'src/app/shared/interfaces/product-type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title: string = 'Nuevo producto';

  constructor(
    private productTypeService: ProductTypeService
    , private notification: NzNotificationService
    , private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(event: ProductType) {
    this.productTypeService.store(event)
      .subscribe(response => {
        this.notification.create(
          'success',
          'Éxito',
          response.message
        );
        this.router.navigate([`/catalogs/product-types/show/${response.data.id}`]);
      }, error => {
        this.notification.create(
          'error',
          'Oops',
          'Ocurrió un error inesperado'
        );
      });
  }

}
