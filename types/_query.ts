import * as imgType from "./_imageinfo";

export interface iQueryBase {
  page: number;
  countPerPage: number;
}

export type tOrderConditionImage = "createTime" | "creator" | "lastupdateTime";

export interface iQueryImageInfo extends iQueryBase {
  exerciseType: imgType.eExerciseType;
  orderCondition: tOrderConditionImage;
}
