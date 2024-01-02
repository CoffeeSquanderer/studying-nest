import { Logger } from '@nestjs/common';

export function Log(serviceName?: string) {
  return function (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    const name = `${serviceName ? `${serviceName}.` : ''}${key as string}`;

    if (original[Symbol.toStringTag] === 'AsyncFunction') {
      descriptor.value = async function <T>(...args: unknown[]): Promise<T> {
        const result = await original.apply(this, args);
        Logger.log(`(${args}) => ${result}`, name);
        return result;
      };
    } else {
      descriptor.value = function <T>(...args: unknown[]): T {
        const result = original.apply(this, args);
        Logger.log(`(${args}) => ${result}`, name);
        return result;
      };
    }
  };
}
