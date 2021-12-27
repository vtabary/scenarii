import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IScenario, ScenariiRegistryService } from '../../../shared/public-api';
import {
  atLeastOneOf,
  onlyOneOf,
  requiredFileType,
} from '../../helpers/custom-validators/custom-validators';
import { CSVParserService } from '../../services/csvparser/csvparser.service';

@Component({
  selector: 'scenarii-csv-opener',
  templateUrl: './csvopener.component.html',
  styleUrls: ['./csvopener.component.css'],
})
export class CSVOpenerComponent {
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private csvParser: CSVParserService,
    private registry: ScenariiRegistryService
  ) {
    this.form = formBuilder.group(
      {
        url: ['', Validators.pattern('https?://.{2,}')],
        file: [
          null,
          [
            requiredFileType([
              'text/csv',
              'application/vnd.ms-excel',
              'application/csv',
            ]),
          ],
        ],
      },
      {
        validators: [
          atLeastOneOf(Validators.required),
          onlyOneOf(Validators.required),
        ],
      }
    );
  }

  public get url(): AbstractControl | null {
    return this.form.get('url');
  }

  public get file(): AbstractControl | null {
    return this.form.get('file');
  }

  public onSubmit() {
    this.form.value.file
      ? this.useLocalFile(this.form.value.file)
      : this.useRemoteUrl(this.form.value.url);
  }

  private useLocalFile(file: File) {
    this.csvParser.parseFile<IScenario>(file).subscribe({
      next: (data) => this.registry.reset(data),
    });
  }

  private useRemoteUrl(url: string) {
    this.csvParser.parseURL<IScenario>(url).subscribe({
      next: (data) => this.registry.reset(data),
    });
  }
}
