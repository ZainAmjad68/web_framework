import { Model } from "../models/Models";
import { UserShow } from "./UserShow";

export abstract class Views<T extends Model<K>, K> {
    regions: { [key:string]:Element } = {};
    abstract template(): string;

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    eventsMap(): {[key:string]: () => void } {      // just a default implementation, any app that wants to incorporate events will have its own implementation
        return {};
    };

    regionsMap(): {[key:string]:string} {
        return {};
    }

    bindModel() {
        this.model.on('change', () => {this.render()})
    }

    bindEvents(fragment: DocumentFragment): void {
        let eventsMap = this.eventsMap();
        for (let eventKey in eventsMap){
            let [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }

    mapRegions(fragment: DocumentFragment) {
        let regionsMap = this.regionsMap();
        for (let regionKey in regionsMap){
            let selector = regionsMap[regionKey];
            let element = fragment.querySelector(selector);
            if (element) {
            this.regions[regionKey] = element;
            }
        }
    }

    onRender(): void {}

    render() {
        console.log('parent start',this.parent)
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
        console.log('parent end',this.parent)
    }
}