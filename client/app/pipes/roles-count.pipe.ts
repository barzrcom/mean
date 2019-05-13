import { Pipe, PipeTransform } from '@angular/core';
import { element } from '@angular/core/src/render3';

@Pipe({ name: 'rolesCountPipe' })
export class RolesCountPipe implements PipeTransform {
    transform(jsonString: string): string {
      var result = "Count of users in each role: \n";
      if(jsonString.length > 0){
        var map =  JSON.parse(jsonString);
        console.log(map.results);
        map.results.forEach(element => {
          result +=  ' ' + element._id + ': ' + element.count + '\n';
        });
      }

      return result;
    }
  }