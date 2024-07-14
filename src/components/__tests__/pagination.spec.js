import { mount } from "@vue/test-utils";
import Pagination from "../Pagination.vue";
import { ref } from "vue";

const mockAppData = {
  currentPage: ref(1),
  pokemonsPerPage: 30,
};
const items = Array.from({ length: 210 }, (_, index) => ({
  name: `Item ${index + 1}`,
}));

describe("Pagination", () => {
  it("renders pagination buttons correctly", () => {
    const wrapper = mount(Pagination, {
      props: { items },
      global: {
        provide: {
          appData: mockAppData,
        },
      },
    });

    expect(wrapper.findAll(".btn-page")).toHaveLength(7);
  });
  it("btn-page--prev is rendered", () => {
    const wrapper = mount(Pagination, {
      props: { items },
      global: {
        provide: {
          appData: mockAppData,
        },
      },
    });

    const prevButton = wrapper.find(".btn-page--prev");

    expect(prevButton.exists()).toBe(true);
  });
  it("computes disabledPrev correctly when currentPage is 1", () => {
    const wrapper = mount(Pagination, {
      props: { items },
      global: {
        provide: {
          appData: mockAppData,
        },
      },
    });

    const disabledPrev = wrapper.vm.disabledPrev;

    expect(disabledPrev).toBe(true);
  });
  it("computes disabledPrev correctly when currentPage is NOT 1", () => {
    mockAppData.currentPage.value = 3
    const wrapper = mount(Pagination, {
      props: { items },
      global: {
        provide: {
          appData: mockAppData,
        },
      },
    });

    const disabledPrev = wrapper.vm.disabledPrev;

    expect(disabledPrev).toBe(false);
  });
});
