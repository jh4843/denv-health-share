<template>
  <VContainer fluid class="bg-main-img fill-height">
    <VCol>
      <VCol>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
        <VCarousel show-arrows="hover" height="200"></VCarousel>
      </VCol>
    </VCol>
  </VContainer>
  <VBottomNavigation color="teal" grow elevation="0">
    <VBtn @click="onClickAddBtn">
      <VIcon class="rounded-circle" icon="mdi-plus-box" size="x-large" color="blue-darken-2"></VIcon>

      Add
      <AddImageModal v-model="isOpenAddDialog"></AddImageModal>
    </VBtn>
    <VBtn @click="onClickLogoutBtn">
      <VIcon class="rounded-circle" icon="mdi-logout-variant" size="x-large" color="blue-grey-darken-3"></VIcon>

      Sign Out
    </VBtn>
    <VBtn>
      <VIcon class="rounded-circle" icon="mdi-minus-box" size="x-large" color="pink-darken-2"></VIcon>

      Delete
    </VBtn>
  </VBottomNavigation>
</template>

<script setup lang="ts">
import * as myTypes from "~/types";

const isOpenAddDialog = ref(false);
const onClickLogoutBtn = () => {
  console.log("onLogout");
  signOutUser();
};

const onClickAddBtn = () => {
  isOpenAddDialog.value = true;
  console.log("onAdd");
};

const { signOutUser } = useFirebaseUser();
</script>
<style></style>
