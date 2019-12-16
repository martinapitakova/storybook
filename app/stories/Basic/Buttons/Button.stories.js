import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/dist/index';

// ******
// IMPORT MAIN COMPONENT

import buttonBasic from '../../../components/Button';

// ******
// IMPORT ALL NOTES
//import markdownNotesDefault from '../../../notes/Basic/Buttons/Button/Button.md';
//import markdownNotesAnother from '../../../notes/Basic/Buttons/Button/Button_large.md';

// ******
// DEFINE NAME VARIABLE

const nameOfComponent = "Button";

// ******
// DEFINE WRAPPING DECORATOR

var decoratorVueTemplate = () => {
	return {template: `<div><div class="component-wrapper"><h1 class="component-name">` + nameOfComponent + `</small></h1><story/></div></div>`}
};

// ******
// DEFINE MAIN OBJECT

export default {
	title: 'Basic|Buttons/Button',
	component: buttonBasic,
	decorators: [withKnobs]
};

// ******
// DEFINE DEFAULT METHODS

const defaultMethods = {
	onClick: action('onClick'),
};

// ******
// DEFINE MODIFICATIONS

export const loading = () => (
	{
		components: {buttonBasic},
		template: '<buttonBasic :type="type" @clicked="onClick" :title="title" :size="size" :disabled="disabled" :outline="outline"/>',
		props: {
			type: {
				default: select('Type', ['', 'btn-primary', 'btn-secondary'])
			},
			title: {
				default: text('Title', 'Button')
			},
			size: {
				default: select('Size', ['', 'btn-medium', 'btn-small', 'btn-large'])
			},
			disabled: {
				default: boolean("Disabled", false)
			},
			outline: {
				default: boolean("Outline", false)
			}
		},
		methods: defaultMethods,
	}
);

loading.story = {
	//parameters: {notes: markdownNotesDefault},
	decorators: [decoratorVueTemplate]
};

// export const large = () => (
// 	{
// 		components: {buttonBasic},
// 		template: '<buttonBasic :background="background" :color="color" :type="type" :disabled="disabled" @clicked="clicked" :large="true" :title="title"/>',
// 		props: {
// 			type: {
// 				default: select('Type', ['', 'btn-primary', 'btn-secondary'])
// 			},
// 			title: {
// 				default: text('Title', 'Button')
// 			},
// 			size: {
// 				default: select('Size', ['', 'btn-medium', 'btn-small', 'btn-large'])
// 			},
// 			disabled: {
// 				default: boolean("Disabled", false)
// 			},
// 			outline: {
// 				default: boolean("Outline", false)
// 			}
// 		},
// 		methods: defaultMethods
// 	}
// );

// ******
// ADD OTHER ADDONS TO MODIFICATIONS

// large.story = {
// 	//parameters: {notes: markdownNotesAnother},
// 	decorators: [decoratorVueTemplate]
// };