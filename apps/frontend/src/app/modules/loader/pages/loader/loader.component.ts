import { Component } from '@angular/core';

@Component({
  selector: 'scenarii-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  public isRunning = false;
}
