<template>
  <div class="flex justify-center gap-0 py-3">

    <button
      class="px-1 align-center text-sm rounded-3 disabled:bg-transparent text-secondary disabled:text-gray-mid"
      @click="pagePrev"
      :disabled="disabledPrev"
    >
      Prev
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      :class="getButtonClasses(page)"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="px-1 align-center text-secondary text-sm rounded-3 disabled:bg-transparent disabled:text-gray-200"
      @click="pageNext"
      :disabled="disabledNext"
    >
      Next
    </button>
    
  </div>
</template>

<script>
import { computed, inject, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Pagination",
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  setup(props) {

    const router = useRouter();
    const route = useRoute();

    const { currentPage, pokemonsPerPage } = inject("appData");

    const totalPages = computed(() => {
      return Math.round(props.items.length / pokemonsPerPage);
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

    const changePage = (page) => {
      const currentPath = route.path === '/' ? '/pokedex' : route.path;
      const basePath = currentPath.split('/page-')[0]
      const urlString = `${basePath}/page-${page}`;
      router.push(urlString)
      currentPage.value = page;
      window.scrollTo(0, 0);
    };

    const getButtonClasses = (page) => {
      return [
        'px-1 align-center text-sm rounded-3',
        currentPage.value === page ? 'text-main bg-gray-dark' : 'text-secondary'
      ];
    };

    watch(() => props.items, (newVal) => {
      console.log("Pagination props.items: ", newVal);
    }, { immediate: true });

    return {
      totalPages,
      currentPage,
      changePage,
      pagePrev,
      pageNext,
      disabledPrev,
      disabledNext,
      getButtonClasses,
    };
  },
};
</script>