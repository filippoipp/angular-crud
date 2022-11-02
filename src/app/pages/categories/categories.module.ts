

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    CategoriesComponent, DialogComponent
  ],
  imports: [
    CommonModule, CategoriesRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule
  ]
})
export class CategoriesModule { }
