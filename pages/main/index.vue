<template>
  <VContainer fluid class="bg-main-img fill-height">
    <VCol class="fill-height">
      <VCol class="fill-height">
        <DisplayItemsGroup
          :exercise="squart"
          :is-active="isActiveSquart"
          @select-item="onChangedSelectedItem"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="lunge"
          :is-active="isActiveLunge"
          @select-item="onChangedSelectedItem"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="bench"
          :is-active="isActiveBench"
          @select-item="onChangedSelectedItem"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="running"
          :is-active="isActiveRunning"
          @select-item="onChangedSelectedItem"
          class="h-auto mb-2"
        ></DisplayItemsGroup>
        <DisplayItemsGroup
          :exercise="etc"
          :is-active="isActiveEtc"
          @select-item="onChangedSelectedItem"
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
    <VBtn v-show="isAdministrator" @click="onClickDeleteBtn">
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

const selectedItem: Ref<myTypes.iImageInfo | undefined> = ref(undefined);

const squart = ref(myTypes.eExerciseType.Squat);
const lunge = ref(myTypes.eExerciseType.Lunge);
const bench = ref(myTypes.eExerciseType.Bench);
const running = ref(myTypes.eExerciseType.Running);
const etc = ref(myTypes.eExerciseType.Etc);

const isActiveSquart = ref(false);
const isActiveLunge = ref(false);
const isActiveBench = ref(false);
const isActiveRunning = ref(false);
const isActiveEtc = ref(false);

const onClickLogoutBtn = () => {
  console.log("onLogout");
  signOutUser();
};

const onClickAddBtn = () => {
  isOpenAddDialog.value = true;
  console.log("onAdd");
};

const onClickDeleteBtn = () => {
  if (selectedItem.value == undefined) return;

  deleteImage(selectedItem.value);
};

const onChangedSelectedItem = (
  item: myTypes.iImageInfo,
  excercise: myTypes.eExerciseType
) => {
  selectedItem.value = item;

  switch (excercise) {
    case myTypes.eExerciseType.Squat:
      isActiveSquart.value = true;
      isActiveLunge.value = false;
      isActiveBench.value = false;
      isActiveRunning.value = false;
      isActiveEtc.value = false;
      break;
    case myTypes.eExerciseType.Lunge:
      isActiveSquart.value = false;
      isActiveLunge.value = true;
      isActiveBench.value = false;
      isActiveRunning.value = false;
      isActiveEtc.value = false;
      break;
    case myTypes.eExerciseType.Bench:
      isActiveSquart.value = false;
      isActiveLunge.value = false;
      isActiveBench.value = true;
      isActiveRunning.value = false;
      isActiveEtc.value = false;
      break;
    case myTypes.eExerciseType.Running:
      isActiveSquart.value = false;
      isActiveLunge.value = false;
      isActiveBench.value = false;
      isActiveRunning.value = true;
      isActiveEtc.value = false;
      break;
    case myTypes.eExerciseType.Etc:
      isActiveSquart.value = false;
      isActiveLunge.value = false;
      isActiveBench.value = false;
      isActiveRunning.value = false;
      isActiveEtc.value = true;
      break;
  }

  console.log("onChangedSelectedItem: ", item, excercise);
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
const { deleteImage } = useFirebaseImage();
</script>
<style></style>
