import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'dashToWhitespace'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: string): string {
    return value.replaceAll("-", " ");
  }
}
