<template>
  <VContainer fluid class="bg-main-img fill-height" style="min-height: 900px">
    <VCol>
      <VCol>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
      </VCol>
      <VFooter height="40" color="transparent">
        <VRow justify="end" align="end">
          <VBtn
            class="rounded-circle mr-5"
            color="blue-darken-2"
            min-width="30px"
            min-height="30px"
            @click="onClickAddBtn"
          >
            <VIcon class="rounded-circle" icon="mdi-plus" size="large"></VIcon>
            <AddImageModal v-model="isOpenAddDialog"></AddImageModal>
          </VBtn>
          <VBtn
            class="rounded-circle mr-5"
            color="pink-darken-2"
            min-width="30px"
            min-height="30px"
            icon="mdi-minus"
          ></VBtn>
        </VRow>
      </VFooter>
    </VCol>
  </VContainer>
</template>

<script setup lang="ts">
import * as myTypes from "~/types";

const isOpenAddDialog = ref(false);

const onClickAddBtn = () => {
  isOpenAddDialog.value = true;
  console.log("onAdd");
};
</script>
<style></style>
