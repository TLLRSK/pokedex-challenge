<template>
  <div class="flex justify-end gap-3 p-3 mt-[40px] m:mt-[56px]">
    <span class="text-secondary">View:</span>

    <div class="flex gap-1">
      <label
        v-for="(view, index) in views"
        :key="index"
        :for="view.name"
        class="viewOption"
      >
        <component :is="view.icon" class="w-3 h-3" />

        <input
          class="hidden"
          type="radio"
          :id="view.name"
          name="viewType"
          :value="view.name"
          @change="setView(view.name)"
          v-model="currentView"
        />

        <span>{{ view.name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { List, Grid } from "../util/index.js";

export default {
  components: { List, Grid },

  inject: ["appData"],

  setup() {
    const { views, currentView, setView } = inject("appData");

    return { currentView, views, setView };
  },
};
</script>
