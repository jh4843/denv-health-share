<template>
  <VContainer fluid class="bg-main-img fill-height">
    <VCol class="fill-height">
      <VCol class="fill-height">
        <DisplayItemsGroup
          :exercise="squart"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="lunge"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="bench"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="running"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="etc"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
      </VCol>
    </VCol>
  </VContainer>
  <VBottomNavigation color="teal" grow elevation="0">
    <VBtn @click="onClickAddBtn">
      <VIcon
        class="rounded-circle"
        icon="mdi-plus-box"
        size="x-large"
        color="blue-darken-2"
      ></VIcon>

      Add
      <AddImageModal v-model="isOpenAddDialog"></AddImageModal>
    </VBtn>
    <VBtn @click="onClickLogoutBtn">
      <VIcon
        class="rounded-circle"
        icon="mdi-logout-variant"
        size="x-large"
        color="blue-grey-darken-3"
      ></VIcon>

      Sign Out
    </VBtn>
    <VBtn v-show="isAdministrator">
      <VIcon
        class="rounded-circle"
        icon="mdi-minus-box"
        size="x-large"
        color="pink-darken-2"
      ></VIcon>

      Delete
    </VBtn>
  </VBottomNavigation>
</template>

<script setup lang="ts">
import * as myTypes from "~/types";

const isOpenAddDialog = ref(false);
const isAdministrator = ref(false);

const squart = ref(myTypes.eExerciseType.Squat);
const lunge = ref(myTypes.eExerciseType.Lunge);
const bench = ref(myTypes.eExerciseType.Bench);
const running = ref(myTypes.eExerciseType.Running);
const etc = ref(myTypes.eExerciseType.Etc);

const onClickLogoutBtn = () => {
  console.log("onLogout");
  signOutUser();
};

const onClickAddBtn = () => {
  isOpenAddDialog.value = true;
  console.log("onAdd");
};

watch(
  () => isOpenAddDialog.value,
  async (newValue, oldVlaue) => {
    if (newValue == false) {
      await reloadNuxtApp();
      console.log("refresh");
    }
  }
);

onMounted(() => {
  const isUserClass = getUserClass();
  console.log("user class: ", isUserClass);

  if (isUserClass == myTypes.eUserClass.Administrator) {
    isAdministrator.value = true;
  } else {
    isAdministrator.value = false;
  }

  console.log(isAdministrator.value);
});

const { signOutUser, getUserClass } = useFirebaseUser();
</script>
<style></style>
