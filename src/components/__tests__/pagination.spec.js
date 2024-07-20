import { mount } from "@vue/test-utils";
import { Pagination, Pokedex, Favs } from "../../util/index";
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

describe("Pagination", () => {
  let wrapper;
  let mockAppData;
  let lastPage;
  let router;
  let route;

  beforeEach(() => {
    mockAppData = {
      currentPage: ref(1),
      pokemonsPerPage: 30,
    };

    router = createRouter({
      history: createWebHistory(),
      routes: [
          {name: 'Pokedex', path: '/', component: Pokedex},
          {name: 'Favs', path: '/favs', component: Favs},
          {path: '/pokedex/page-:page', component: Pokedex},
      ]
    });

    route = {
      path: '/',
    };

    wrapper = mount(Pagination, {
      props: { 
        items: new Array(210).fill('pokemon') 
      },
      global: {
        provide: {
          appData: mockAppData,
        },
        plugins: [router],
        mocks: {
          $route: route,
        },
      },
    });

    lastPage = Math.round(wrapper.props().items.length / mockAppData.pokemonsPerPage);
  })

  it('should inject appData correctly', () => {
    expect(wrapper.vm.currentPage).toBe(mockAppData.currentPage.value);
    expect(mockAppData.currentPage.value).toBe(1);
  });

  it("renders pagination buttons correctly", () => {
    expect(wrapper.findAll(".btn-page")).toHaveLength(lastPage);
  });

  it("btn-page--prev is rendered", () => {
    const prevButton = wrapper.find(".btn-page--prev");

    expect(prevButton.exists()).toBe(true);
  });

  it("computes disabledPrev correctly when currentPage is 1", () => {
    const disabledPrev = wrapper.vm.disabledPrev;

    expect(disabledPrev).toBe(true);
  });

  it("computes disabledPrev correctly when currentPage is NOT 1", () => {
    mockAppData.currentPage.value = 3

    const disabledPrev = wrapper.vm.disabledPrev;

    expect(disabledPrev).toBe(false);
  });

  it("computes disabledNext correctly when currentPage is the last page", () => {
    mockAppData.currentPage.value = lastPage;
    const disabledNext = wrapper.vm.disabledNext;

    expect(disabledNext).toBe(true);
  });

  it("computes disabledNext correctly when currentPage is NOT the last page", () => {
    mockAppData.currentPage.value = 5

    const disabledNext = wrapper.vm.disabledNext;

    expect(disabledNext).toBe(false);
  });

  it("pagination changes to next page on click next page button", () => {
    const pageBtnNext = wrapper.find(".btn-page--next");
    pageBtnNext.trigger("click");

    expect(mockAppData.currentPage.value).toBe(2);
  })

  it("currentPage changes to 5 page on clicking page 5 button", () => {
    const pageButtons = wrapper.findAll('.btn-page');
    pageButtons[4].trigger("click");

    expect(mockAppData.currentPage.value).toBe(5);
  })

  it('should navigate to the correct URL when changing page', () => {
    const spy = vi.spyOn(router, 'push');
    wrapper.vm.changePage(2);

    expect(spy).toHaveBeenCalledWith('/pokedex/page-2');
  });
  

});
