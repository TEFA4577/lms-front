import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCursoComponent } from './card-curso/card-curso/card-curso.component';
import { AccordionComponent } from './accordion/accordion/accordion.component';



@NgModule({
  declarations: [CardCursoComponent, AccordionComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
