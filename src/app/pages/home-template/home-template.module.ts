import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeTemplateRoutingModule } from './home-template-routing.module';
import { HomeTemplateComponent } from './home-template.component';

import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [HomeTemplateComponent],
  imports: [
    CommonModule,
    HomeTemplateRoutingModule,
    MaterialModule,
  ],
})
export class HomeTemplateModule {}
