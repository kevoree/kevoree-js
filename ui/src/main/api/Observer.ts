export class Observer<T> {
  private handler: (elem: T) => void;

  on(handler: (elem: T) => void) {
    this.handler = handler;
  }

  dispatch(elem: T) {
    if (this.handler) {
      this.handler(elem);
    }
  };
}
