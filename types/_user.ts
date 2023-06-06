export interface iUserInfo {
  userClass?: eUserClass;
  userId: string;
  password: string;
}

export interface iUserClassItem {
  id: eUserClass;
  text: string;
}

export enum eUserClass {
  Administrator = 0,
  User = 1,
}

export function getUserItemList(): iUserClassItem[] {
  var items: iUserClassItem[] = Object.keys(eUserClass)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: eUserClass[name as keyof typeof eUserClass],
        text: name,
      };
    });

  return items;
}

export function getUserClassItem(userClass: eUserClass): iUserClassItem {
  const indexOfS = Object.values(eUserClass).indexOf(userClass);

  return {
    id: userClass,
    text: Object.keys(eUserClass)[indexOfS],
  };
}

export function getValueUserClass(
  userClass: keyof typeof eUserClass
): eUserClass {
  return eUserClass[userClass];
}
