import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ICSVConfiguration,
  IScenarioReport,
  ScenarioConverterService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-csv-configurator',
  templateUrl: './csv-configurator.component.html',
  styleUrls: ['./csv-configurator.component.css'],
})
export class CSVConfiguratorComponent implements OnChanges {
  @Input()
  public csvContent: { [key: string]: string }[] | null = null;

  @Output()
  public configurationUpdated = new EventEmitter<ICSVConfiguration>();

  @Output()
  public scenarios = new EventEmitter<IScenarioReport[]>();

  @Output()
  public cleared = new EventEmitter<void>();

  public form: FormGroup;
  public columns: string[] = [];

  constructor(
    formBuilder: FormBuilder,
    private scenarioConverter: ScenarioConverterService
  ) {
    this.form = formBuilder.group({
      identifier: ['', Validators.required],
      message: ['', Validators.required],
      category: [''],
      subcategory: [''],
      dependency: [''],
      comment: [''],
    });
  }

  public get identifier(): AbstractControl | null {
    return this.form.get('identifier');
  }

  public get message(): AbstractControl | null {
    return this.form.get('message');
  }

  public get category(): AbstractControl | null {
    return this.form.get('category');
  }

  public get subcategory(): AbstractControl | null {
    return this.form.get('subcategory');
  }

  public get dependency(): AbstractControl | null {
    return this.form.get('dependency');
  }

  public get comment(): AbstractControl | null {
    return this.form.get('comment');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['csvContent']) {
      return;
    }

    this.columns = Object.keys((this.csvContent || [])[0]).sort();
    this.form.setValue({
      identifier: this.getFieldIfExisting(this.columns, 'id'),
      message: this.getFieldIfExisting(this.columns, 'message'),
      category: this.getFieldIfExisting(this.columns, 'category'),
      subcategory: this.getFieldIfExisting(this.columns, 'subcategory'),
      dependency: this.getFieldIfExisting(this.columns, 'dependency'),
      comment: this.getFieldIfExisting(this.columns, 'comment'),
    });
  }

  public onClear() {
    this.cleared.next();
  }

  public onSubmit() {
    this.configurationUpdated.next({
      columns: {
        identifier: this.identifier?.value || 'id',
        message: this.message?.value || 'message',
        category: this.category?.value,
        subcategory: this.subcategory?.value,
        dependency: this.dependency?.value,
        comment: this.comment?.value,
      },
    });

    this.scenarios.next(
      this.scenarioConverter.csvToScenarios(this.csvContent || [])
    );
  }

  private getFieldIfExisting(list: string[], name: string): string {
    return list.includes(name) ? name : '';
  }
}
