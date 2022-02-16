import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from 'src/app/shared/interfaces/product-type';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  title: string = 'Detalles de producto';
  productType: ProductType;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productType = this.route.snapshot.data.productType;
  }

  get editRoute(): string {
    return `/catalogs/product-types/edit/${this.productType.id}`;
  }

}
