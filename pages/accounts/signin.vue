<template>
  <VContainer
    fluid
    class="account-bg-img fill-height"
    style="min-height: 900px"
  >
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol
        cols="12"
        md="6"
        lg="5"
        sm="6"
        style="height: 65%"
        align-items="center"
      >
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="6">
            <h1>Sign In</h1>
            <p class="text-medium-emphasis">Enter your account information</p>

            <VForm @submit.prevent="submit" class="mt-7">
              <div>
                <label class="label text-grey-darken-2" for="userClass"
                  >Class</label
                >
                <VCombobox
                  :rules="[ruleRequired]"
                  v-model="userItem"
                  :items="myTypes.getUserItemList()"
                  prepend-inner-icon="mdi-license"
                  item-title="text"
                  item-value="id"
                  id="class"
                  name="class"
                />
              </div>
              <div>
                <label class="label text-grey-darken-2" for="userId">ID</label>
                <VTextField
                  :rules="[ruleRequired, ruleUserId]"
                  v-model="userId"
                  prepend-inner-icon="mdi-account"
                  id="id"
                  name="id"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password"
                  >Password</label
                >
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="mdi-lock"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
              <div class="mt-5">
                <VBtn
                  type="submit"
                  block
                  min-height="44"
                  class="gradient primary"
                  >Sign In</VBtn
                >
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <span
                >Don't have an account?
                <NuxtLink
                  to="/accounts/signup"
                  class="font-weight-bold text-primary"
                  >Sign Up</NuxtLink
                ></span
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import * as myTypes from "~/types";

const userItem = ref(
  myTypes.getUserClassItem(myTypes.eUserClass.Administrator)
);

const userClassId = computed(() => console.log(userItem.value.id));
const userId = ref("");
const password = ref("");

const { data: res } = await useAsyncData("signIn", () =>
  $fetch("/api/accounts/signin", {
    method: "get",
    body: {
      userClass: userItem.value.id,
      userId: userId.value,
      password: password.value,
    } as myTypes.iUserInfo,
  })
);

const { rulePassLen, ruleRequired, ruleUserId } = useFormRules();

const submit = async () => {};
</script>
<style></style>
