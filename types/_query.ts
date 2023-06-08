import * as imgType from "./_imageinfo";

export interface iQueryBase {
  page: number;
  itemCount: number;
}

export type tOrderConditionImage = "createTime" | "creator" | "lastupdateTIme";

export interface iQueryImageInfo extends iQueryBase {
  exerciseType: imgType.eExerciseType;
  orderCondition: tOrderConditionImage;
}
