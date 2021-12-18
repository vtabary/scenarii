import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  public dataChanged = new EventEmitter<string>();

  /**
   * Get a value by its id.
   */
  public get<T>(id: string): T | null {
    return JSON.parse(this.storage.getItem(id) ?? 'null');
  }

  /**
   * Set a value
   */
  public set<T>(id: string, value: T | null): void {
    this.storage.setItem(id, JSON.stringify(value));
    this.dataChanged.emit(id);
  }

  /**
   * Set a value
   */
  public delete(id: string): void {
    this.storage.removeItem(id);
    this.dataChanged.emit(id);
  }

  private get storage(): Storage {
    return window.localStorage;
  }
}
