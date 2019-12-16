import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/dist/index';

import RangeSlider from '../../../../../components/RangeSlider';
import markdownNotesDefault from "../../../../../notes/Basic/Form/Sliders/RangeSlider/RangeSlider-default.md";

const stories = storiesOf('Basic|Form/Sliders/RangeSlider', module);
stories.addDecorator(withKnobs);

export const methods = {
    textChanged: action('textChanged'),
};

stories.add('default', () => ({
    components: { RangeSlider },
    template: `<RangeSlider :twoHandlers="twoHandlers"/>`,
    props: {
        twoHandlers: {
            default: boolean("Two Handlers", false)
        }
    //     placeholder: {
    //         default: text('Placeholder', 'Some placeholder for input...')
    //     },
    //     additionalText: {
    //         default: text('Additional text', 'Some text...')
    //     },
    //     type: {
    //         default: select('Type', ['','input-success', 'input-warning', 'input-error'])
    //     }
    },
    methods
	}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
);
    // .add('prefix', () => ({
    //     components: { InputRange },
    //     template: `<InputRange :prefix="true" :textOfAddon="textOfPrefix" @textChanged="textChanged"/>`,
    //     props: {
    //         textOfPrefix: {
    //             default: text('Text', 'text123')
    //         }
    //     },
    //     methods
    // }))
    // .add('sufix', () => ({
    //     components: { InputRange },
    //     template: `<InputRange :suffix="true" :textOfAddon="textOfSuffix" @textChanged="textChanged"/>`,
    //     props: {
    //     },
    //     methods
    // }));