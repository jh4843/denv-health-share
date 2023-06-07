<template>
  <VSheet class="mx-auto" elevation="8" max-width="1200">
    <VSlideGroup
      v-model="model"
      class="pa-4"
      selected-class="bg-success"
      show-arrows
    >
      <VSlideGroupItem
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <VCard
          color="grey-lighten-1"
          :class="['ma-4', selectedClass]"
          height="100"
          width="200"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <VScaleTransition>
              <VBtn v-if="isSelected" size="48" color="transparent">
                <VIcon
                  color="white"
                  size="48"
                  icon="mdi-close-circle-outline"
                />
              </VBtn>
            </VScaleTransition>
          </div>
        </VCard>
      </VSlideGroupItem>
    </VSlideGroup>
  </VSheet>
</template>

<script setup lang="ts">
//import * as myTypes from "~/types";
const model = ref("");
</script>
