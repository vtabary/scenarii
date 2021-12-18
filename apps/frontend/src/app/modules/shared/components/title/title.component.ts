import { Component, Input } from '@angular/core';

@Component({
  selector: 'scenarii-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent {
  @Input()
  public title = '';
}
