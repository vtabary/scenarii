import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleComponent } from './components/title/title.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [TitleComponent, FormErrorComponent, BadgeComponent],
  imports: [CommonModule],
  exports: [
    FontAwesomeModule,
    TitleComponent,
    FormErrorComponent,
    BadgeComponent,
  ],
})
export class SharedModule {}
