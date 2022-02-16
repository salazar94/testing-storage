import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductType } from 'src/app/shared/interfaces/product-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  title: string = 'Editar producto'
  productType: ProductType;

  constructor(
    private route: ActivatedRoute
    , private productTypeService: ProductTypeService
    , private notification: NzNotificationService
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.productType = this.route.snapshot.data.productType;
  }

  submit(event: ProductType): void {
    this.productTypeService.update(this.productType.id, event)
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
