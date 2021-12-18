import { Component } from '@angular/core';

@Component({
  selector: 'scenarii-file-history',
  templateUrl: './file-history.component.html',
  styleUrls: ['./file-history.component.css'],
})
export class FileHistoryComponent {
  public urls: string[] = [];
}
