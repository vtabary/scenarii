import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSVConfiguratorFieldComponent } from './csv-configurator-field.component';

describe('CSVConfiguratorFieldComponent', () => {
  let component: CSVConfiguratorFieldComponent;
  let fixture: ComponentFixture<CSVConfiguratorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CSVConfiguratorFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVConfiguratorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
