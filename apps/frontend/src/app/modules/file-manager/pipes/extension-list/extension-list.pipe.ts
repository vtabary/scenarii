import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extensionList',
})
export class ExtensionListPipe implements PipeTransform {
  transform(values: string[], prefix = ''): string {
    return values.map((value) => `${prefix}.${value}`).join(',');
  }
}
