import { Component } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { RemoteFileHistoryService } from '../../services/remote-file-history/remote-file-history.service';

@Component({
  selector: 'scenarii-file-history',
  templateUrl: './file-history.component.html',
  styleUrls: ['./file-history.component.css'],
})
export class FileHistoryComponent {
  public history$: Observable<string[]>;

  constructor(private fileHistory: RemoteFileHistoryService) {
    this.history$ = this.fileHistory.historyChanged.pipe(
      startWith(fileHistory.list())
    );
  }
}
