/**
 * @description 公共装饰器
 */
// 方法装饰器，处理异常，按照格式化Service返回值
export const HandleException = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        return [error, null];
      }
    };
    return descriptor;
  };
};
