import { User, UserProps } from "../models/User";
import { Views } from "./Views";

export class UserForm extends Views<User, UserProps> {
    // methods personal to UserForm
    onSetAgeClick = () : void => {
        this.model.setRandomAge();
    }

    onSetNameEnter = () : void => {
        console.log('parent',this.parent);
        let input = this.parent.querySelector('input');
        if (input) {
        let newName = input.value;

        this.model.set({name:newName});
        }
    }

    onSaveModel = () : void =>  {
        this.model.save();
    }

    onButtonClick() {
        console.log('Button Clicked!')
    }

    // General Methods for each and every class extending View
    eventsMap(): {[key:string]: () => void} {
        return {
            'click:Button': this.onButtonClick,
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameEnter,
            'click:.save-model': this.onSaveModel
        }
    }

    template(): string {
        return `
        <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Set Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save</button>
        </div>
        `
    }
}