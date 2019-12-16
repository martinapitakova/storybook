import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/dist/index';

import Radio from '../../../../components/Radio';

//import doc notes
import markdownNotesDefault from '../../../../notes/Basic/Form/Radio/Radio-default.md';

const stories = storiesOf('Basic|Form/Radio', module);
stories.addDecorator(withKnobs);

stories.add('Radio', () => ({
    components: { Radio },
    props: {
        label: {
            default: text('Label', 'Test')
        },
        disabled: {
            default: boolean("Disabled", false)
        },
        check: {
            default: boolean("Checked", false)
        }
    },
    template: `<radio :label="label" :isDisabled="disabled" :isCheck="check"/>`
	}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
);
