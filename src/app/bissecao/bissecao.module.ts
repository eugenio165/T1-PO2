import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BissecaoComponent } from './bissecao.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BissecaoComponent],
  exports: [BissecaoComponent],
})
export class BissecaoModule { }
