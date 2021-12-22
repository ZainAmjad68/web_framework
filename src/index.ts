/*import { User } from "../models/User";

let user1 = new User({ name: "Zain", age: 23 });

console.log(user1.get("name"));
user1.set({ name: "Amjad" });

user1.on("change", () => {
  console.log("change triggered");
});

user1.on("saved", () => {
  console.log("Saved");
});

user1.trigger("change");
user1.trigger("saved");


import axios from "axios";

axios.post("http://localhost:3000/users", {name:"Zain", age:23});

axios.get("http://localhost:3000/users/1");
*/

import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";
import { UserShow } from "./views/UserShow";

/*

import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";

//let user1 = new User({ id:1 });

let user = User.buildUser({ name:"Ali", age:18});

user.on("save", () => {
  console.log("Saved!!");
});

user.on("change", () => {
  console.log(user);
});

//user.fetch();

const collection = User.buildUserCollection();
collection.on('change', () => {
  console.log(collection);
})
collection.fetch();

let root = document.getElementById('root')

if (root) {
let form = new UserEdit(root, user);
form.render();

console.log('Nested UserEdit', form);
} else {
  throw new Error('Root Element Not Found!');
}

*/

//user1.set({name:"Zain Amjad", age:32});
//user1.save();
//user1.trigger("save");
//user1.fetch();

const users = new Collection('http://localhost:3000/users', (json: UserProps) => { return User.buildUser(json) });

users.on('change', () => {
  const root = document.getElementById('root');

  console.log(root);
  if (root) {
    new UserList(root, users).render();
  }
})

users.fetch();
