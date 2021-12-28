import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { ExtensionListPipe } from '../../pipes/extension-list/extension-list.pipe';
import { FileUploadComponent } from '../file-upload/file-upload.component';

import { CSVOpenerComponent } from './csvopener.component';

describe('CSVOpenerComponent', () => {
  let component: CSVOpenerComponent;
  let fixture: ComponentFixture<CSVOpenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CSVOpenerComponent,
        FileUploadComponent,
        ExtensionListPipe,
      ],
      imports: [ReactiveFormsModule, SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
