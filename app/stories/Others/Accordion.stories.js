import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/dist/index';

import Accordion from '../../components/Accordion';

//import doc notes
import markdownNotesDefault from '../../notes/Others/Accordion/Accordion-default.md';

const stories = storiesOf('Others|Accordion', module);
stories.addDecorator(withKnobs);

stories.add('Accordion', () => ({
    components: { Accordion },
    props: {
        isOpened1: {
            default: boolean('Opened1', false)
        },
        isOpened2: {
            default: boolean('Opened2', true)
        }
    },
    template: `<accordion :isOpened1="isOpened1" :isOpened2="isOpened2"/>`
}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
);