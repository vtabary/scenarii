import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';

import { DoneComponent } from './done.component';

describe('DoneComponent', () => {
  let component: DoneComponent;
  let fixture: ComponentFixture<DoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoneComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
