<template>
  <div class="flex justify-end gap-3 p-3">
    <span>View:</span>
    <div class="flex gap-3">
      <label v-for="(view, index) in views" :key="index" :for="view.name" class="viewOption">
        <component :is="view.icon" class="w-3 h-3" />
        <input 
          class="hidden"
          type="radio" 
          :id="view.name" 
          name="viewType"
          :value="view.name"
          @change="selectView(view.name)"
          v-model="currentView"
        />
        <span>{{ view.name }}</span>
      </label>
    </div>
  </div>
</template>
<script>
import {List, Grid} from '../util/index.js';
export default {
    components: { List, Grid },
    inject: ['currentView', 'views', 'selectView'],
}
</script>