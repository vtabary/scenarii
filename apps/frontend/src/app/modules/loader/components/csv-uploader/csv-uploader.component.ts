import { Component, EventEmitter, Output } from '@angular/core';
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
  atLeastOneOf,
  onlyOneOf,
  requiredFileType,
} from '../../helpers/custom-validators/custom-validators';
import { CSVParserService } from '../../services/csvparser/csvparser.service';
import { RemoteFileHistoryService } from '../../services/remote-file-history/remote-file-history.service';
import { Observable, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'scenarii-csv-uploader',
  templateUrl: './csv-uploader.component.html',
  styleUrls: ['./csv-uploader.component.css'],
})
export class CSVUploaderComponent {
  @Output()
  public csvUploaded = new EventEmitter<{ [key: string]: string | number }[]>();

  public form: FormGroup;
  public faTimesCircle = faTimesCircle;
  public currentFile: { [key: string]: string | number }[] | null = null;

  constructor(
    formBuilder: FormBuilder,
    private csvParser: CSVParserService,
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
    (this.form.value.file
      ? this.useLocalFile(this.form.value.file)
      : this.useRemoteUrl(this.form.value.url)
    ).subscribe((data) => {
      this.csvUploaded.emit(data);
    });
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
  private useLocalFile(
    file: File
  ): Observable<{ [key: string]: string | number }[]> {
    return this.csvParser.parseFile<{ [key: string]: string | number }>(file);
  }

  /**
   * Parse and save the file from the remote URL.
   */
  private useRemoteUrl(
    url: string
  ): Observable<{ [key: string]: string | number }[]> {
    return this.csvParser
      .parseURL<{ [key: string]: string | number }>(url)
      .pipe(
        tap(() => {
          this.fileHistory.add(url);
        })
      );
  }
}
