import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs/dist/index';

import InputGroup from '../../../../components/InputGroup';

//import doc notes
import markdownNotesDefault from '../../../../notes/Basic/Form/InputGroups/InputGroup-default.md';


const stories = storiesOf('Basic|Form/Input Groups', module);
stories.addDecorator(withKnobs);

stories.add('default', () => ({
    components: { InputGroup },
    template: `<inputGroup :label="label" :counter="counter" :selector="select" />`,
    props: {
		label: {
			default: text('Label', 'Label')
		},
		counter: {
			default: boolean('Counter', true)
		},
		select: {
			default: boolean('Select', true)
		},
    },
	}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
	)
	.add('with counter', () => ({
		components: { InputGroup },
		template: `<inputGroup :label="label" :counter="counter" />`,
		props: {
			label: {
				default: text('Label', 'Label')
			},
			counter: {
				default: boolean('Counter', true)
			},
		},
	}))
	.add('with select', () => ({
		components: { InputGroup },
		template: `<inputGroup :label="label" :selector="select" />`,
		props: {
			label: {
				default: text('Label', 'Label')
			},
			select: {
				default: boolean('Select', true)
			},
		},
	}));