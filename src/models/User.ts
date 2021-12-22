import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Model } from "./Models";
import { Collection } from "./Collection";

let rootUrl = 'http://localhost:3000/users'

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(), 
      new ApiSync<UserProps>(rootUrl)
      )
  }
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json:UserProps) => User.buildUser(json))
  }

  // An example of how this could be reused
  /*static buildLocalUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(), 
      new LocalSync<UserProps>(rootUrl)
      )
  }*/

  setRandomAge() {
    const Age = Math.round(Math.random()*100);
    this.set({age:Age});
  }
}
