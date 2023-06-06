<template>
  <VDialog v-model="value" width="50%" height="auto">
    <VCol class="fill-height" align-self="center">
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
      ></VFileInput>
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
//import * as myTypes from "~/types";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const fileList = ref([]);
const isMultiple = ref(true);

const fileRules = reactive([
  (value: Array<any>) => {
    console.log("rule", value);

    if (!value || !value.length) {
      console.log("rule1");
      return true;
    }

    if (value.length > 5) {
      console.log("rule2");
      return "Up to 5 files are allowed";
    }

    for (const img of value) {
      if (img.size > 5 * 1024 * 1024) {
        console.log("rule3");
        return "image size should be less than 5 MB!";
      }
    }

    console.log("rule4");

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

  uploadImages(fileList.value);
};

const onChanges = (event: Event) => {
  console.log("onChange: ", fileList);
};

const { uploadImages } = useFirebaseImage();
</script>
