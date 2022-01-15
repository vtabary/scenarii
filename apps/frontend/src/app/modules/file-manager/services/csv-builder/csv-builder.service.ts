import { Injectable } from '@angular/core';
import { unparse } from 'papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CSVBuilderService {
  public build<T extends { [key: string]: string }>(
    data: T[]
  ): Observable<string> {
    return new Observable<string>((observer) => {
      observer.next(
        unparse<T>(data, {
          delimiter: ';',
          quotes: true,
          header: true,
        })
      );
      observer.complete();
    });
  }
}
