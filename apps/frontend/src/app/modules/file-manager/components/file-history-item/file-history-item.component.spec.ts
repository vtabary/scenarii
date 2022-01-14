import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHistoryItemComponent } from './file-history-item.component';

describe('FileHistoryItemComponent', () => {
  let component: FileHistoryItemComponent;
  let fixture: ComponentFixture<FileHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileHistoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
