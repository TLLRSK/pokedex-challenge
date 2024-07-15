<template>
  <div class="view-toggler flex justify-end gap-3 p-3 mt-[40px] m:mt-[56px]">

    <span class="text-secondary">View:</span>

    <div class="views flex gap-1">
      <label
        v-for="(view, index) in views"
        :key="index"
        :for="view.name"
        class="view-option hover:bg-gray-200"
      >
        <component :is="view.icon" class="view-icon w-3 h-3" />

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

<script lang="ts">
import { inject } from "vue";
import { List, Grid } from "../util/index";
import { AppData } from '../interfaces/appData';

export default {
  components: { List, Grid },

  setup() {
    const appData = inject<AppData>("appData");

    if (!appData) {
      throw new Error("appData is not provided");
    }

    const { views, currentView, setView } = appData;

    return { currentView, views, setView };
  },
};
</script>
