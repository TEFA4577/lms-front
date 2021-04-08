import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCursoComponent } from './card-curso/card-curso.component';
import { AccordionComponent } from './accordion/accordion/accordion.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [CardCursoComponent, AccordionComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class ComponentsModule { }
