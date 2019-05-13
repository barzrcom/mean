import { Reference } from '@angular/compiler/src/render3/r3_ast';

export class User {
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  comments?: Array<Reference>;
}
