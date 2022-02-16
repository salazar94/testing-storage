import { Component, OnInit } from '@angular/core';
import { PRODUCT_TYPES_COLUMNS } from './columns';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  resource: string = 'product-types';
  title: string = 'Lista de productos';
  columns = PRODUCT_TYPES_COLUMNS;

  constructor() { }

  ngOnInit(): void {
  }

}
