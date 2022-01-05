import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  IScenario,
  ScenariosRegistryService,
} from '../../../shared/public-api';
import {
  atLeastOneOf,
  onlyOneOf,
  requiredFileType,
} from '../../helpers/custom-validators/custom-validators';
import { CSVParserService } from '../../services/csvparser/csvparser.service';
import { RemoteFileHistoryService } from '../../services/remote-file-history/remote-file-history.service';

@UntilDestroy()
@Component({
  selector: 'scenarii-csv-opener',
  templateUrl: './csvopener.component.html',
  styleUrls: ['./csvopener.component.css'],
})
export class CSVOpenerComponent {
  public form: FormGroup;
  public faTimesCircle = faTimesCircle;

  constructor(
    formBuilder: FormBuilder,
    private csvParser: CSVParserService,
    private scenarios: ScenariosRegistryService,
    private fileHistory: RemoteFileHistoryService,
    private route: ActivatedRoute,
    private router: Router
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

    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (!params['url']) {
        return;
      }

      this.form.patchValue({ url: params['url'] });
    });
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
  public onClearUrl() {
    if (!this.url) {
      return;
    }

    this.url.reset();
    this.router.navigateByUrl('/load');
  }

  /**
   * Parse and save the file from the local file.
   */
  private useLocalFile(file: File) {
    this.csvParser.parseFile<IScenario>(file).subscribe({
      next: (data) => this.scenarios.reset(data),
    });
  }

  /**
   * Parse and save the file from the remote URL.
   */
  private useRemoteUrl(url: string) {
    this.csvParser.parseURL<IScenario>(url).subscribe({
      next: (data) => {
        this.scenarios.reset(data);
        this.fileHistory.add(url);
      },
    });
  }
}
