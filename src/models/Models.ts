import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
    set(value: T): void;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Event<T> {
    on(eventName:string, callback: () => void): void;
    trigger(eventName:string):void;
}

interface HasID {
    id?: number;
}

export class Model<T extends HasID> {
    constructor(private attributes: ModelAttributes<T>, private events: Event<T>, private sync: Sync<T>) {}

   // Passthrough Method
  // useful as now we don't have to call user.events.on() in index file, instead we just do user.on() which is more intuitive and it will return a reference to events.on() method
  get on() {
    return this.events.on;
  }

  // even shorter syntax for Passthrough method:
  // on = this.events.on

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    let id = this.get('id')
    if (typeof id !== 'number') {
      throw new Error('cannot fetch without an ID');
    }
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save(): void {
    let data = this.attributes.getAll();
    this.sync.save(data).then((response: AxiosResponse) => {
      this.trigger('save');
    }).catch((err) => {
      this.trigger('error');
    });
  }

}