import { Component, Input } from '@angular/core';
import { RemoteFileHistoryService } from '../../services/remote-file-history/remote-file-history.service';

@Component({
  selector: 'scenarii-file-history-item',
  templateUrl: './file-history-item.component.html',
  styleUrls: ['./file-history-item.component.css'],
})
export class FileHistoryItemComponent {
  @Input()
  public url: string | null = null;

  constructor(private fileHistory: RemoteFileHistoryService) {}

  public onRemove(url: string): void {
    this.fileHistory.remove(url);
  }
}
