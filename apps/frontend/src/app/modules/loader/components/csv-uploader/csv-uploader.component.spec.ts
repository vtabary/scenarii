import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { ExtensionListPipe } from '../../pipes/extension-list/extension-list.pipe';
import { FileUploadComponent } from '../file-upload/file-upload.component';

import { CSVUploaderComponent } from './csv-uploader.component';

describe('CSVUploaderComponent', () => {
  let component: CSVUploaderComponent;
  let fixture: ComponentFixture<CSVUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CSVUploaderComponent,
        FileUploadComponent,
        ExtensionListPipe,
      ],
      imports: [ReactiveFormsModule, SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
