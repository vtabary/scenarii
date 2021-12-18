import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * From https://gist.github.com/darrenmothersele/7afda13d858a156ce571510dd78b7624
 */
@Directive({
  selector: '[scenariiDragAndDrop]',
})
export class DragAndDropDirective {
  // The directive emits a `fileDrop` event
  // with the list of files dropped on the element
  // as an JS array of `File` objects.
  @Output() fileDrop = new EventEmitter<Array<File>>();
  @Output() dragOver = new BehaviorSubject<boolean>(false);

  // Disable dropping on the body of the document.
  // This prevents the browser from loading the dropped files
  // using it's default behaviour if the user misses the drop zone.
  // Set this input to false if you want the browser default behaviour.
  @Input() preventBodyDrop = true;

  // The `drop-zone-active` class is applied to the host
  // element when a drag is currently over the target.
  @HostBinding('class.drop-zone-active')
  active = false;

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.active = false;
    this.dragOver.next(false);

    const { dataTransfer } = event as DragEvent;

    if (!dataTransfer) {
      return;
    }

    let files: File[] = [];
    if (dataTransfer.items) {
      files = Array.from(dataTransfer.items)
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFile())
        .filter((item): item is File => !!item);

      dataTransfer.items.clear();
    } else {
      files = Array.from(dataTransfer.files);
      dataTransfer.clearData();
    }

    this.fileDrop.emit(Array.from(files));
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.active = true;
    this.dragOver.next(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave() {
    this.active = false;
    this.dragOver.next(false);
  }

  @HostListener('body:dragover', ['$event'])
  onBodyDragOver(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  @HostListener('body:drop', ['$event'])
  onBodyDrop(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
    }
  }
}
