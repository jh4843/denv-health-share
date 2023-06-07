export enum eExerciseType {
  Squat = 0,
  Lunge,
  Bench,
  Running,
  Etc,
}

export interface iExcerciseTypeItem {
  id: eExerciseType;
  text: string;
}

export function getExcerciseTypeList(): iExcerciseTypeItem[] {
  var items: iExcerciseTypeItem[] = Object.keys(eExerciseType)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: eExerciseType[name as keyof typeof eExerciseType],
        text: name,
      };
    });

  return items;
}

export function getExcerciseTypeItem(
  exerciseType: eExerciseType
): iExcerciseTypeItem {
  const indexOfS = Object.values(eExerciseType).indexOf(exerciseType);

  return {
    id: exerciseType,
    text: Object.keys(eExerciseType)[indexOfS],
  };
}

export interface iImageInfo {
  exerciseType: eExerciseType;
  creator: string;
  createTime: Date;
  contents: string;
  url: string[];
}
