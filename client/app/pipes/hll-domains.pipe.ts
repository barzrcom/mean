import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hllDomains' })
export class HllDomainsPipe implements PipeTransform {
    transform(value: number): string {
      return 'the database has ' + value + ' unique email domains';
    }
  }