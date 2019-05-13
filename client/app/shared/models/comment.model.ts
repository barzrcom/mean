import { User } from './user.model';
import { Reference } from '@angular/compiler/src/render3/r3_ast';

export class Comment {
  _id : String;
  date : Date;
  title: String;
  message: String;
  rate: Number;
  user: Reference;
  asset: Reference;
}
