import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './products-routing.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
