// src/stories/MyButton.test.js
import { shallowMount } from "@vue/test-utils";
import Component from '../components/Button.vue';

describe('MyButton', () => {
	let vm;
	let wrapper;
	beforeEach(() => {
		wrapper = shallowMount(Component);
		vm = wrapper.vm;
	});

	describe('onClick', () => {
		it('emits clicked', () => {
			vm.$emit = jest.fn();
			vm.onClick();
			expect(vm.$emit).toHaveBeenCalledWith('clicked');
		})
	});
})