<template></template>

<script setup lang="ts">
onMounted(() => {
  const rout = useRouter();
  rout.push({ path: "/accounts/signin" });
});
</script>
