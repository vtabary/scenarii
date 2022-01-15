import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CSVExporterComponent } from './csv-exporter.component';

describe('CSVExporterComponent', () => {
  let component: CSVExporterComponent;
  let fixture: ComponentFixture<CSVExporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CSVExporterComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
