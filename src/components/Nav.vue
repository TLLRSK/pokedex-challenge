<template>

  <nav class="nav">

    <button class="menu-toggler" :class="getMenuTogglerClasses" @click="toggleMenu">
      <menu-icon />
    </button>

    <ul ref="linkList" :class="getLinkListClasses">
      <li class="link-list-item ml-auto" v-for="route in routes" :key="route.name">
        <router-link class="link text-main font-semibold uppercase hover:underline" :to="route.path" @click="closeMenu">{{route.name}}</router-link>
      </li>
    </ul>

    <div v-if="isChecked" class="overlay fixed top-[0] right-[0] bottom-[0] left-[0] -z-[10]"></div>
  </nav>

</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { MenuIcon } from "../util/index";
import { useRouter } from 'vue-router';

export default {
  components: {
    MenuIcon,
  },
  setup() {
    
    const router = useRouter();

    const routes = router.options.routes.filter((route) => route.hasOwnProperty('name'));

    const isChecked = ref(false);

    const linkList = ref<HTMLElement | null >(null);

    const getMenuTogglerClasses = computed(() => {
      return [
        "flex m:hidden rounded-full",
        {"bg-white text-gray-dark": isChecked.value}
      ];
    });

    const getLinkListClasses = computed(() => {
      return [
        {
          'flex flex-col': isChecked.value,
          'hidden m:flex': !isChecked.value
        },
        "m:flex-row absolute m:static left-[0] right-[0] bg-gray-mid m:bg-transparent mt-1 m:mt-[0px] p-2 m:p-[0] gap-3",
      ];
    });

    const toggleMenu = () => {
      isChecked.value = !isChecked.value;
    }
    
    const closeMenu = () => {
      isChecked.value = false;
    };

    watch(
      () => isChecked.value,
      (newValue) => {

        if (newValue) {
          setTimeout(() => {
            document.addEventListener("click", outsideClickHandler);
          }, 100);
        } else {
          document.removeEventListener('click', outsideClickHandler);
        }
      }
    );
    
    const outsideClickHandler = (e: Event) => {
      const target = e.target as HTMLElement;

      if (linkList.value && !linkList.value.contains(target)) {
        closeMenu();
      }
    };

    return {
      routes,
      isChecked,
      getMenuTogglerClasses,
      getLinkListClasses,
      linkList,
      toggleMenu,
      closeMenu,
    };
  },
};
</script>
