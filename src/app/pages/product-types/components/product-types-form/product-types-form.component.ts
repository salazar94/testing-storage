import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductType } from 'src/app/shared/interfaces/product-type';

@Component({
  selector: 'app-product-types-form',
  templateUrl: './product-types-form.component.html',
  styleUrls: ['./product-types-form.component.css']
})
export class ProductTypesFormComponent implements OnInit {

  @Input() set productType(data: ProductType) {
    if (data) {
      this.productTypesForm.patchValue(data);
    }
  }
  @Output() submitEvent = new EventEmitter<ProductType>();
  productTypesForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.productTypesForm = this.formBuilder.group({
      name: ['', Validators.required],
      unit_price: ['', Validators.required],
    });
  }

  submitForm() {
    Object.values(this.productTypesForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
    if (this.productTypesForm.valid) {
      this.submitEvent.emit(this.productTypesForm.value);
    }
  }

  get formValidate() {
    const name = this.productTypesForm.get('name');
    const unit_price = this.productTypesForm.get('unit_price');;
    return {
      name: {
        markInvalid: name.invalid && name.touched,
        required: name.hasError('required')
      },
      unit_price: {
        markInvalid: unit_price.invalid && unit_price.touched,
        required: unit_price.hasError('required')
      }
    };
  }

}
