import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs/dist/index';

import InputBasic from '../../../../components/InputBasic';

//import doc notes
import markdownNotesDefault from '../../../../notes/Basic/Form/Input/Input-default.md';


const stories = storiesOf('Basic|Form/Input', module);
stories.addDecorator(withKnobs);

export const methods = {
    textChanged: action('textChanged'),
};

stories.add('default', () => ({
    components: { InputBasic },
    template: `<inputBasic :label="label" :inputValue="inputValue" :placeholder="placeholder" @textChanged="textChanged" :max="maxCharacters" :additionalText="additionalText" :type="type"/>`,
    props: {
		label: {
			default: text('Label', 'Label')
		},
		inputValue: {
			default: text('Value', '')
		},
        placeholder: {
            default: text('Placeholder', 'Some placeholder for input...')
        },
        additionalText: {
            default: text('Additional text', '')
        },
        type: {
            default: select('Type', ['','input-success', 'input-warning', 'input-error'])
        },
		maxCharacters: {
			default: number('Max:', 25)
		}
    },
    methods
	}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
	)
    .add('prefix', () => ({
        components: { InputBasic },
        template: `<inputBasic :label="label" :prefix="true" :textOfAddon="textOfPrefix" @textChanged="textChanged"/>`,
        props: {
            textOfPrefix: {
                default: text('Text', 'text123')
            },
			label: {
				default: text('Label', 'Label')
			},
        },
        methods
    }))
    .add('sufix', () => ({
        components: { InputBasic },
        template: `<inputBasic :label="label" :suffix="true" :textOfAddon="textOfSuffix" @textChanged="textChanged"/>`,
        props: {
            textOfSuffix: {
                default: text('Text', 'text123')
            },
			label: {
				default: text('Label', 'Label')
			},
        },
        methods
    }))
	.add('quantity', () => ({
		components: { InputBasic },
		template: `<inputBasic :label="label" @textChanged="textChanged"/>`,
		props: {
			label: {
				default: text('Label', 'Label')
			},
		},
		methods
	}))
	.add('with character counter', () => ({
		components: { InputBasic },
		template: `<inputBasic :label="label" :max="maxCharacters" @textChanged="textChanged"/>`,
		props: {
			label: {
				default: text('Label', 'Label')
			},
			maxCharacters: {
				default: number('Max:', 25)
			}
		},
		methods
	}));