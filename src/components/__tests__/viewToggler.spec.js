import { mount } from "@vue/test-utils";
import { ViewToggler, Grid, List } from "../../util/index";
import { ref } from "vue";

describe("viewToggler", () => {
  let wrapper;
  let mockAppData;

  beforeEach(() => {
    
    mockAppData = {
      views: [
        {
          name: "grid",
          icon: Grid,
        },
        {
          name: "list",
          icon: List,
        },
      ],
      currentView: ref("grid"),
      setView: vi.fn(),
    };

    wrapper = mount(ViewToggler, {
      global: {
        provide: {
          appData: mockAppData,
        },
      },
    });

  });

  it("ViewToggler is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("it has view buttons", () => {
    const viewBtns = wrapper.findAll(".view-option")
    const views = mockAppData.views.length;

    expect(viewBtns.length).toBe(views)
  })

  it("change view to list when click on list view-option is selected", () => {
    const viewBtns = wrapper.find('input[value="list"]');
    viewBtns.setChecked();

    expect(mockAppData.setView).toHaveBeenCalledWith('list')
    expect(mockAppData.currentView.value).toBe('list')
  })

});
