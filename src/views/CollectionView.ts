import { Collection } from "../models/Collection";

export abstract class CollectionView<T,K> {
    constructor(public parent: Element, public collection: Collection<T, K>) {}

    abstract renderItem(model: T, itemParent: Element): void;

    render() {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');

        for (let model of this.collection.models) {
            const itemParent = document.createElement('div');
            this.renderItem(model, itemParent);
            templateElement.content.append(itemParent);
        }

        console.log('parent in Collection View:',this.parent)
        console.log('Content in Template:',templateElement.content)
        console.log('Template:',templateElement)
        this.parent.append(templateElement.content);
    }
}



