import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CSVParserService {
  public parseFile<T>(csvFile: File): Observable<T[]> {
    return from(
      new Promise<T[]>((resolve, reject) =>
        parse<T>(csvFile, {
          download: false,
          header: true,
          worker: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        })
      )
    );
  }

  public parseURL<T>(url: string): Observable<T[]> {
    return from(
      new Promise<T[]>((resolve, reject) =>
        parse<T>(url, {
          download: true,
          header: true,
          worker: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        })
      )
    );
  }
}
