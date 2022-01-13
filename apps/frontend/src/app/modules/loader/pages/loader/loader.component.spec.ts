import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { CSVUploaderComponent } from '../../components/csv-uploader/csv-uploader.component';
import { FileHistoryComponent } from '../../components/file-history/file-history.component';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { StatusComponent } from '../../components/status/status.component';
import { ExtensionListPipe } from '../../pipes/extension-list/extension-list.pipe';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoaderComponent,
        StatusComponent,
        FileHistoryComponent,
        CSVUploaderComponent,
        FileUploadComponent,
        ExtensionListPipe,
      ],
      imports: [ReactiveFormsModule, SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
