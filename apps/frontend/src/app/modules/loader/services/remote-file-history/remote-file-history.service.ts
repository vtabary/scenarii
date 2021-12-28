import { EventEmitter, Injectable } from '@angular/core';
import { DataManagerService } from '../../../shared/public-api';

@Injectable({
  providedIn: 'root',
})
export class RemoteFileHistoryService {
  private static readonly STORAGE_ID = 'remote-file-history';
  public historyChanged = new EventEmitter<string[]>();

  constructor(private dataManager: DataManagerService) {}

  /**
   * Get the list of urls from the history
   */
  public list(): string[] {
    return (
      this.dataManager.get<string[]>(RemoteFileHistoryService.STORAGE_ID) ?? []
    );
  }

  /**
   * Add a url to the history
   * It keeps only the last 10 urls
   */
  public add(url: string): void {
    let history = this.list();
    history = history.filter((item) => item !== url);
    history.unshift(url);
    history = history.slice(0, 10);

    this.setHistory(history);
  }

  /**
   * Remove all the values from the history
   */
  public remove(url: string): void {
    const history = this.list().filter((item) => item !== url);
    this.setHistory(history);
  }

  /**
   * Remove all the values from the history
   */
  public clearAll(): void {
    this.dataManager.delete(RemoteFileHistoryService.STORAGE_ID);
    this.historyChanged.emit([]);
  }

  /**
   * Reset the history to the given values
   */
  private setHistory(history: string[]): void {
    this.dataManager.set<string[]>(
      RemoteFileHistoryService.STORAGE_ID,
      history
    );
    this.historyChanged.emit(history);
  }
}
