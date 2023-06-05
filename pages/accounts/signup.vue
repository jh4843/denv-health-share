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
            <h1>Sign Up</h1>
            <p class="text-medium-emphasis">
              Enter your details to get started
            </p>

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
                <label class="label text-grey-darken-2" for="id">ID</label>
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
                  type="password"
                  v-model="password"
                  prepend-inner-icon="mdi-lock"
                  id="password"
                  name="password"
                />
              </div>
              <div class="mt-5">
                <VBtn
                  type="submit"
                  block
                  min-height="45"
                  class="gradient primary"
                  @click="onClickSignUpButton"
                  >Create Account</VBtn
                >
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <span
                >Already have an account?
                <NuxtLink
                  to="/accounts/signin"
                  class="font-weight-bold text-primary"
                  >Sign In</NuxtLink
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

const userId = ref("");
const password = ref("");

const onClickSignUpButton = (event: Event) => {
  let userInfo:myTypes.iUserInfo = {
    userClass: userItem.value.id,
    userId: userId.value,
    password: password.value,
  }
  let res = signUpUser(userInfo);

  console.log("onClickSignUpButton: ", res);
}

const { signUpUser } = useFirebaseUser();

const { rulePassLen, ruleRequired, ruleUserId } = useFormRules();

const submit = async () => {};
</script>
