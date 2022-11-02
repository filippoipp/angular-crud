

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    ProductsComponent, DialogComponent
  ],
  imports: [
    CommonModule, ProductsRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, CurrencyMaskModule
  ]
})
export class ProductsModule { }
