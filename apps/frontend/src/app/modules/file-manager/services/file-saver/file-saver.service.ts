import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileSaverService {
  constructor(private zone: NgZone) {}

  /**
   * Adapted from https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
   */
  public saveText(
    data: string,
    filename: string,
    type = 'text/plain'
  ): Observable<void> {
    return new Observable<void>((observer) => {
      this.zone.runOutsideAngular(() => {
        const file = new Blob([data], { type: type });

        const a = document.createElement('a');
        const url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          observer.next();
          observer.complete();
        }, 0);
      });
    });
  }
}
