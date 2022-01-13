import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'scenarii-csv-configurator-field',
  templateUrl: './csv-configurator-field.component.html',
  styleUrls: ['./csv-configurator-field.component.css'],
})
export class CSVConfiguratorFieldComponent {
  @Input()
  public fieldName: string | null = null;

  @Input()
  public label = '';

  @Input()
  public form: FormGroup | null = null;

  @Input()
  public control: AbstractControl | null = null;

  @Input()
  public errorMessage: string | null = null;

  @Input()
  public columns: string[] = [];
}
