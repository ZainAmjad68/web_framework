type Callback = () => void;

export class Eventing {
    // [key: string] tells JS that there will be some properties in this obj but we don't know the name yet.
    // thus, JS lets us put properties with any name in here
    events: { [key: string]: Callback[] } = {};

    // on = () => {} instead of on() {} to fix the this.events is undefined issue in User caused by the Passthrough Method

    on = (eventName: string, callback: Callback): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
      }
    
          // trigger = () => {} instead of trigger() {} to fix the this.events is undefined issue in User caused by the Passthrough Method

      trigger = (eventName: string): void => {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) {
          return;
        }
        handlers.forEach((callback) => {
          callback();
        });
      }
    
}