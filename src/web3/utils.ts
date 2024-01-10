export const Web3Utils = {
  to<T>(promise: Promise<T>): Promise<[null | any, null | T]> {
    return promise.then((v: T) => [null, v] as [null | any, null | T]).catch((e: any) => [e, null]);
  },
  eq(address1: string, address2: string) {
    return (address1 || '').toLocaleUpperCase() === (address2 || '').toLocaleUpperCase();
  },
  shortAmount(amount: string) {
    const matches = amount.match(/^\d+(?:\.\d{0,4})?/);
    return (matches && matches[0]) || '0.0';
  },
  toFixedClip(num: string | number, decimal: number) {
    const str = typeof num === 'number' ? num.toString() : num;
    const matches = str.match(new RegExp(`^\d+(?:\.\d{0,${decimal}})?`));
    return (matches && matches[0]) || '0';
  },
};
