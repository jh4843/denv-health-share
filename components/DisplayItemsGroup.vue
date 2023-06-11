<template>
  <VSheet class="mx-auto" elevation="8" max-width="1200" :title="title">
    <VCol>
      <VLabel :text="title" />
      <VSlideGroup
        v-model="model"
        class="pa-4"
        selected-class="bg-success"
        @update:model-value="updateSelectedItem"
        show-arrows
      >
        <VSlideGroupItem
          v-for="(valX, x) in itemCount"
          :key="x"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <VCard
            color="indigo-lighten-5"
            :class="['ma-4', selectedClass]"
            width="300px"
            aspect-ratio="1/1"
            @click="toggle"
          >
            <VCol>
              <v-img width="300" height="100" :src="images[x].url[0]">
                <div class="d-flex fill-height align-center justify-center">
                  <VScaleTransition>
                    <VBtn v-if="isSelected" size="64" color="teal-accent-3">
                      <VIcon
                        color="white"
                        size="48"
                        icon="mdi-comment-text-multiple-outline"
                      />
                    </VBtn>
                  </VScaleTransition>
                </div>
              </v-img>
              <VCardText class="text-body-2">
                {{ itemContents(images[x]) }}
              </VCardText>
            </VCol>
          </VCard>
        </VSlideGroupItem>
      </VSlideGroup>
    </VCol>
    <VPagination
      v-model="page"
      :length="pageLength"
      @update:model-value="updatedPage"
    />
  </VSheet>
</template>

<script setup lang="ts">
import * as myTypes from "~/types";

const props = defineProps({
  exercise: { type: Number as PropType<myTypes.eExerciseType>, required: true },
  isActive: { type: Boolean },
});

const emit = defineEmits<{
  (e: "select-item", item: myTypes.iImageInfo, excercise: number): void;
}>();

const model = ref("");
const page = ref(1);
const itemTotalCount = ref(0);
const countPerPage = ref(2);
const images: Ref<myTypes.iImageInfo[]> = ref([]);

const title = computed({
  get() {
    const indexOfS = Object.values(myTypes.eExerciseType).indexOf(
      props.exercise
    );
    return Object.keys(myTypes.eExerciseType)[indexOfS];
  },
  set() {},
});

const pageLength = computed({
  get() {
    return itemTotalCount.value / countPerPage.value;
  },
  set() {
    console.log(
      "item total count: ",
      itemTotalCount.value,
      "- count per page: " + countPerPage.value
    );
  },
});

const itemCount = computed({
  get() {
    return images.value.length;
  },
  set(newValue) {
    console.log("item count is changed: ", images.value.length);
  },
});

const itemContents = computed({
  get() {
    return (item: myTypes.iImageInfo) => {
      const dttm = new Date(item.createTime.toDate());
      const dateString =
        dttm.getFullYear() + "-" + dttm.getMonth() + "-" + dttm.getDay();

      const time = dttm.getHours() + ":" + dttm.getMinutes();

      return item.creator + " : " + dateString + " " + time;
    };
  },
  set(newValue) {
    console.log("itemContents is changed: ", newValue);
  },
});

const updatedPage = async () => {
  await queryItems();
};

const queryItems = async () => {
  images.value = [];

  const queryCondition: myTypes.iQueryImageInfo = {
    page: page.value,
    countPerPage: countPerPage.value,
    exerciseType: props.exercise,
    orderCondition: "createTime",
  };

  itemTotalCount.value = await getImageCount(queryCondition);

  console.log("onMount count: ", itemTotalCount.value);

  const resItems = await getImageInfoList(queryCondition);

  resItems.forEach((item) => {
    images.value.push(item);
  });
};

const updateSelectedItem = () => {
  console.log("select-item: ", images.value[Number(model.value)]);
  emit("select-item", images.value[Number(model.value)], props.exercise);
};

watch(
  () => props.isActive,
  async (newValue, oldVlaue) => {
    if (newValue == false) {
      model.value = "";
      console.log("deactivated: ", props.exercise);
    }
  }
);

onMounted(async () => {
  await queryItems();
});

const { getImageInfoList, getImageCount } = useFirebaseImage();
</script>
