<template></template>

<script setup lang="ts">
onMounted(() => {

  const {isSignedIn, getUserId} = useFirebaseUser();

  const isSign = isSignedIn();
  const rout = useRouter();

  if(isSign)
  {
    rout.push({ path: "/main" });
  }
  else
  {
    rout.push({ path: "/accounts/signin" });
  }
});
</script>
