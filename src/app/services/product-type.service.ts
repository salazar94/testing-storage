import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductType } from '../shared/interfaces/product-type';

const URL_BASE: string = `${environment.endpoint}api/product-types`;

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.http.get(
      `${URL_BASE}/${id}`
    );
  }

  store(requestBody: any): Observable<any> {
    return this.http.post(
      `${URL_BASE}/store`,
      requestBody
    );
  }

  update(productTypeId: number, productType: ProductType): Observable<any> {
    return this.http.post(
      `${URL_BASE}/update/${productTypeId}`,
      productType
    );
  }

}
