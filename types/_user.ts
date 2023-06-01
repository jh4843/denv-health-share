export enum eUserClass {
  Administrator = 0,
  User = 1,
}

export function getKeyListUserClass(): string[] {
  var keys: string[] = [];
  for (var cls in eUserClass) {
    if (typeof eUserClass[cls] === "number") keys.push(cls);
  }

  console.log(keys);

  return keys;
}

export function getTextUserClass(userClass: eUserClass) {
  const indexOfS = Object.values(eUserClass).indexOf(userClass);

  return Object.keys(eUserClass)[indexOfS];
}
