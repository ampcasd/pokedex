import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dashToWhitespace'})
export class DashToWhitespacePipe implements PipeTransform {
  transform(value: string): string {
    return value.replaceAll('-', ' ');
  }
}
