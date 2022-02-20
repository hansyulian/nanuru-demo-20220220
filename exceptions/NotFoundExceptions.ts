import { Exception } from "./Exception";


export class UserNotFoundException extends Exception {

  constructor(details: any) {
    super('UserNotFoundException', details);
  }
}

export class ItemNotFoundException extends Exception {
  constructor(details: any) {
    super('ItemNotFoundException', details);
  }
}

export class UserCartNotFoundException extends Exception {
  constructor(details: any) {
    super('UserCartNotFoundException', details);
  }
}