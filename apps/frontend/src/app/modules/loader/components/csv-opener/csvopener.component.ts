import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        url: [
          '',
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
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
