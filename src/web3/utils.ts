export const Web3Utils = {
  to<T>(promise: Promise<T>): Promise<[null | any, null | T]> {
    return promise.then((v: T) => [null, v] as [null | any, null | T]).catch((e: any) => [e, null]);
  },
};
