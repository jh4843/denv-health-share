<template>
  <VDialog v-model="value" width="50%" height="auto">
    <VCol class="fill-height" align-self="center">
      <VFileInput
        :multiple="isMultiple"
        width="auto"
        height="20%"
        accept="image/*"
        :rules="fileRules"
      ></VFileInput>
      <VRow height="20%" align="end" align-content="end" justify="end">
        <VBtn
          min-width="64px"
          width="30%"
          class="ma-5 gradient upload"
          rounded="xl"
          @click="$emit('update:modelValue', false)"
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

const isMultiple = ref(true);

const fileRules = reactive([
  (images: Array<File>) => {
    if (!images || !images.length) return true;

    if (images.length > 5) return "Up to 5 files are allowed";

    for (const img of images) {
      if (img.size > 5 * 1024 * 1024)
        return "image size should be less than 5 MB!";
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

const isOpend = computed;
</script>
