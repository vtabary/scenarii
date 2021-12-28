import { TestBed } from '@angular/core/testing';

import { RemoteFileHistoryService } from './remote-file-history.service';

describe('RemoteFileHistoryService', () => {
  let service: RemoteFileHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteFileHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
