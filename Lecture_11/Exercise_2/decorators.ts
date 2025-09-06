export function Loggable() {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const original = descriptor.value;
  
      if (!original) {
        throw new Error("`@Loggable can only be used on values.`");
      }
  
      descriptor.value = function (...args: any[]) {
        console.log(`--- Entering method: ${propertyKey} ---`);
        console.log(`Arguments received:`, args);
  
        const result = original.apply(this, args);
  
        console.log(`--- Exiting method: ${propertyKey} ---`);
        console.log(`Method returned:`, result);
  
        return result;
      };
    };
  }