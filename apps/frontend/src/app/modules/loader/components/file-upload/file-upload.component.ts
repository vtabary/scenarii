import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'scenarii-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input()
  public extensions: string[] = [];

  public faFileUpload = faFileUpload;
  public file: File | null = null;
  public isOver = false;

  public onChange: (file: File | null) => void = () => undefined;
  public onTouched: () => void = () => undefined;

  public writeValue(value: File) {
    if (value) {
      this.file = value;
    }
  }

  public registerOnChange(fn: (file: File | null) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.file = element.files?.[0] || null;
    this.onChange(this.file);
  }

  public onClear() {
    this.file = null;
    this.onChange(null);
  }

  public onFileDropped(files: File[]) {
    const file = files[0];
    if (!file) {
      return;
    }

    this.file = file;
    this.onChange(this.file);
  }
}
