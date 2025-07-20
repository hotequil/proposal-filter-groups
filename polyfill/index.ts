type Callbacks<T> = ((item: T, index: number, array: T[]) => boolean)[];

export {};

declare global {
  interface Array<T> {
    filterGroups(...callbacks: Callbacks<T>): T[][];
  }
}

if (!Array.prototype.filterGroups) {
  Object.defineProperty(Array.prototype, "filterGroups", {
    value: function <T>(...callbacks: Callbacks<T>): T[][] {
      if (!callbacks.length)
        throw new TypeError("At least one callback must be provided");

      for (const callback of callbacks)
        if (typeof callback !== "function")
          throw new TypeError("All callbacks must be functions");

      const length = this.length;
      const callbacksLength = callbacks.length;

      const groups: T[][] = Array.from(
        { length: callbacksLength + 1 },
        () => []
      );

      for (let index = 0; index < length; index++) {
        const item = this[index];
        let matched = false;

        for (
          let callbackIndex = 0;
          callbackIndex < callbacksLength;
          callbackIndex++
        ) {
          if (callbacks[callbackIndex](item, index, this)) {
            groups[callbackIndex].push(item);
            matched = true;

            break;
          }
        }

        if (!matched) groups[callbacksLength].push(item);
      }

      return groups;
    },
    writable: false,
    configurable: false,
    enumerable: false
  });
}
