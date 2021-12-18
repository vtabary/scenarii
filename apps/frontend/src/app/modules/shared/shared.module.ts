import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleComponent } from './components/title/title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [CommonModule],
  exports: [FontAwesomeModule, TitleComponent],
})
export class SharedModule {}
