export class Attributes<T> {
    constructor(private data: T) {}

    // using get = () => {} instead of get() {} to fix the this.events is undefined issue in User caused by the Passthrough Method

    // assuming that T is an object, this says that the argument to get() can only be one of the Properties/Keys of that Object (K extends keyof T), and the method will return the value of the Key provided (T[K])
    get = <K extends keyof T>(key: K): T[K] => {
      return this.data[key];
    }

    getAll = (): T => {
        return this.data;
    }
  
    set(update: T): void {
      Object.assign(this.data, update);
    }
}