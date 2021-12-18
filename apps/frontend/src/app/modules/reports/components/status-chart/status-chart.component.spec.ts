import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusChartComponent } from './status-chart.component';

describe('StatusChartComponent', () => {
  let component: StatusChartComponent;
  let fixture: ComponentFixture<StatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusChartComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
