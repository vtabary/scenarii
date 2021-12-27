import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'scenarii-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css'],
})
export class FormErrorComponent {
  @Input()
  public control: AbstractControl | null = null;

  @Input()
  public message = 'This field is invalid';

  @Input()
  public errorName: string | null = null;
}
