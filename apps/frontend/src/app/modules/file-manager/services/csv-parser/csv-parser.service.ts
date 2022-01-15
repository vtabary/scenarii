import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CSVParserService {
  public parseFile<T extends { [key: string]: string }>(
    csvFile: File
  ): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      parse<T>(csvFile, {
        download: false,
        header: true,
        worker: true,
        dynamicTyping: false,
        delimiter: ';',
        complete: (results) => observer.next(results.data),
        error: (error) => observer.error(error),
      });
    });
  }

  public parseURL<T extends { [key: string]: string }>(
    url: string
  ): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      parse<T>(url, {
        download: true,
        header: true,
        worker: true,
        delimiter: ';',
        complete: (results) => observer.next(results.data),
        error: (error) => observer.error(error),
      });
    });
  }
}
