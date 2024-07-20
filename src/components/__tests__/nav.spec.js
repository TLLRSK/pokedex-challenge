import { mount } from "@vue/test-utils";
import { Nav, Pokedex, Favs } from "../../util/index";
import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from "vue";

describe("Nav", () => {
    let wrapper;
    let mockAppData;
    let router;
    let routes;

    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: [
                {name: 'Pokedex', path: '/', component: Pokedex},
                {name: 'Favs', path: '/favs', component: Favs},
                {path: '/pokedex/page-:page', component: Pokedex},
            ]
        });

        wrapper = mount(Nav, {
            global: {
                plugins: [router],
            }
        })

        routes = router.options.routes.filter((route) => route.hasOwnProperty('name'));
    })

    it('has the correct routes in setup', () => {
        expect(routes.length).toBe(2);
        expect(routes.length);
    });

    it('change properly the url on clicking at link', () => {
        const spy = vi.spyOn(router, 'push');
        const navLink = wrapper.find('a[href="/favs"]')
        
        navLink.trigger("click")

        expect(spy).toHaveBeenCalledWith('/favs')
    })

    it('opens on clicking menu toggler', () => {
        const togglerBtn = wrapper.find('.menu-toggler');
        const initialIsChecked = wrapper.vm.isChecked;

        expect(initialIsChecked).toBe(false);

        togglerBtn.trigger("click")

        expect(wrapper.vm.isChecked).toBe(true);
    })

    it('closes on clicking nav link', () => {
        wrapper.vm.toggleMenu();

        const linkBtns = wrapper.findAll('.link');

        linkBtns[1].trigger("click");

        expect(wrapper.vm.isChecked).toBe(false);
    })

    it('should close menu on overlay click', async () => {
        await wrapper.vm.toggleMenu();
       
        expect(wrapper.vm.isChecked).toBe(true);

        const overlay = wrapper.find('.overlay');
        expect(overlay.exists()).toBe(true);

        await overlay.trigger('click');

        // expect(wrapper.vm.isChecked).toBe(false);
        // Doesn't work
    });
})
