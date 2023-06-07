<template>
  <VDialog v-model="value" width="50%" height="auto">
    <VCol class="fill-height" align-self="center">
      <VCombobox
        v-model="excerciseType"
        :items="myTypes.getExcerciseTypeList()"
        prepend-inner-icon="mdi-run"
        item-title="text"
        item-value="id"
        id="class"
        name="class"
      />
      <VFileInput
        v-model="fileList"
        :multiple="isMultiple"
        label="Input image files to upload"
        width="auto"
        height="20%"
        accept="image/*"
        ref=""
        @change="onChanges"
        :rules="fileRules"
      />
      <VTextarea
        label="Contents"
        v-model="textContents"
        :rules="textAreaRules"
      ></VTextarea>
      <VRow height="20%" align="end" align-content="end" justify="end">
        <VBtn
          min-width="64px"
          width="30%"
          class="ma-5 gradient upload"
          rounded="xl"
          @click="onClickUploadButton"
          >Upload
        </VBtn>
        <VBtn
          min-width="64px"
          width="30%"
          class="ma-5 gradient close"
          rounded="xl"
          @click="$emit('update:modelValue', false)"
          >Close
        </VBtn>
      </VRow>
    </VCol>
  </VDialog>
</template>

<script setup lang="ts">
import * as myTypes from "~/types";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const excerciseType = ref(
  myTypes.getExcerciseTypeItem(myTypes.eExerciseType.Bench)
);

const fileList = ref([]);
const textContents = ref("");
const isMultiple = ref(true);

const fileRules = reactive([
  (value: Array<any>) => {
    if (!value || !value.length) {
      return true;
    }

    if (value.length > 5) {
      return "Up to 5 files are allowed";
    }

    for (const img of value) {
      if (img.size > 5 * 1024 * 1024) {
        return "image size should be less than 5 MB!";
      }
    }

    return true;
  },
]);

const textAreaRules = reactive([
  (value: Array<any>) => {
    if (value.length > 64) {
      return "Up to 64 characters are allowed";
    }

    return true;
  },
]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const onClickUploadButton = async (event: Event) => {
  console.log("onClickUploadButton: ", fileList.value);

  uploadImages(fileList.value, excerciseType.value.id, textContents.value);
};

const onChanges = (event: Event) => {
  console.log("onChange: ", fileList);
};

const { uploadImages } = useFirebaseImage();
</script>
