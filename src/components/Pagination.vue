<template>
  <div v-if="items.length > 0" class="flex justify-center gap-0 py-3">

    <button
      class="btn-page--prev disabled:text-gray-mid"
      :class="getPrevNextButtonsClasses"
      @click="pagePrev"
      :disabled="disabledPrev"
    >
      Prev
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      class="btn-page"
      :class="getButtonClasses(page)"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="btn-page--next disabled:text-gray-mid"
      :class="getPrevNextButtonsClasses"
      @click="pageNext"
      :disabled="disabledNext"
    >
      Next
    </button>
    
  </div>
</template>

<script lang="ts">
import { computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { AppData } from '../interfaces/appData';

export default {
  name: "Pagination",
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  setup(props) {

    const appData = inject<AppData>("appData");

    if (!appData) {
      throw new Error("appData is not provided");
    }

    const router = useRouter();
    const route = useRoute();

    const { currentPage, pokemonsPerPage } = appData;

    const totalPages = computed(() => {
      const total = Math.round(props.items.length / pokemonsPerPage);
      return total === 0 ? 1 : total;
    });

    const pagePrev = () => {
      changePage(currentPage.value - 1);
    };

    const pageNext = () => {
      changePage(currentPage.value + 1);
    };

    const disabledPrev = computed(() => {
      return currentPage.value === 1;
    });

    const disabledNext = computed(() => {
      return currentPage.value === totalPages.value;
    });

    const changePage = (page: number) => {
      const currentPath = route.path === '/' ? '/pokedex' : route.path;
      const basePath = currentPath.split('/page-')[0]
      const urlString = `${basePath}/page-${page}`;
      router.push(urlString)
      currentPage.value = page;
      window.scrollTo(0, 0);
    };

    const getButtonClasses = (page: number) => {
      return [
        'px-1 align-center text-sm rounded-3 hover:bg-gray-mid',
        currentPage.value === page ? 'text-main bg-gray-dark' : 'text-secondary'
      ];
    };

    const getPrevNextButtonsClasses = computed(() => {
      return "px-1 align-center text-secondary text-sm rounded-3 hover:bg-gray-mid disabled:bg-transparent disabled:text-gray-mid";
    })
    
    return {
      totalPages,
      currentPage,
      changePage,
      pagePrev,
      pageNext,
      disabledPrev,
      disabledNext,
      getPrevNextButtonsClasses,
      getButtonClasses,
    };
  },
};
</script>