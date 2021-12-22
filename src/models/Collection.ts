import axios, { AxiosRequestTransformer, AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T,K> {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(public rootUrl: string, public deserialize: (json : K) => T) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch() {
        axios.get(this.rootUrl).then((result:AxiosResponse) => {
            result.data.forEach((element: K) => {
                const item = this.deserialize(element);
                this.models.push(item);
            });
            this.trigger('change');
        })
    }

}