import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleComponent } from './components/title/title.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

@NgModule({
  declarations: [TitleComponent, FormErrorComponent],
  imports: [CommonModule],
  exports: [FontAwesomeModule, TitleComponent, FormErrorComponent],
})
export class SharedModule {}
